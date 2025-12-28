import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface EmailCampaign {
    to: string;
    subject: string;
    html: string;
    personalization?: {
        name?: string;
        company?: string;
        industry?: string;
    };
}

// Email Templates
const templates = {
    introduction: (name: string, company: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>مرحباً ${name}،</h2>
      
      <p>اسمي [اسمك] من Blore Agency - وكالة تسويق رقمي وتصميم إبداعي.</p>
      
      <p>لاحظت أن ${company} تعمل في [الصناعة]، ونحن متخصصون في مساعدة الشركات مثلكم على:</p>
      
      <ul>
        <li>✨ تصميم هوية بصرية احترافية</li>
        <li>🚀 بناء مواقع ويب وتطبيقات جوال</li>
        <li>📈 استراتيجيات تسويق رقمي فعّالة</li>
        <li>🎨 تصميم جرافيك وموشن جرافيكس</li>
      </ul>
      
      <p>أكملنا أكثر من 150 مشروع ناجح لشركات في مصر والسعودية والإمارات.</p>
      
      <p><strong>هل تهتم باستشارة مجانية لمدة 15 دقيقة؟</strong></p>
      
      <p>يمكنك الرد على هذا الإيميل أو حجز موعد مباشرة: <a href="https://yourwebsite.com/contact">احجز الآن</a></p>
      
      <p>في انتظار ردك،<br>
      [اسمك]<br>
      Blore Agency<br>
      📧 info@bloreagency.com<br>
      📱 +20 120 294 4459</p>
    </div>
  `,

    followUp1: (name: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>مرحباً ${name}،</h2>
      
      <p>أردت المتابعة معك بخصوص رسالتي السابقة.</p>
      
      <p>فهمت أنك مشغول، لكن أردت أن أشارك معك بعض أعمالنا السابقة:</p>
      
      <ul>
        <li>🎯 Livora Scents - إعادة تصميم العلامة التجارية (+150% brand awareness)</li>
        <li>🏥 Qatrat Al-Nada - موقع طبي (+180% website traffic)</li>
        <li>🛒 Mehtag Masr - منصة خدمات (+250% bookings)</li>
      </ul>
      
      <p>يمكنك مشاهدة المزيد: <a href="https://yourwebsite.com/work">أعمالنا</a></p>
      
      <p>هل لديك 10 دقائق هذا الأسبوع للحديث؟</p>
      
      <p>تحياتي،<br>
      [اسمك]</p>
    </div>
  `,

    followUp2: (name: string, company: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>مرحباً ${name}،</h2>
      
      <p>هذه آخر رسالة مني - لا أريد أن أزعجك! 😊</p>
      
      <p>فقط أردت أن أخبرك أننا نقدم <strong>استشارة مجانية</strong> لتحليل:</p>
      
      <ul>
        <li>📊 موقعك الحالي (إن وجد)</li>
        <li>🎯 منافسيك في السوق</li>
        <li>💡 فرص التحسين</li>
      </ul>
      
      <p><strong>بدون أي التزام!</strong></p>
      
      <p>إذا كنت مهتماً، فقط رد بـ "نعم" وسأرسل لك التفاصيل.</p>
      
      <p>وإذا لم تكن مهتماً، لا مشكلة - أتمنى لك التوفيق مع ${company}! 🚀</p>
      
      <p>تحياتي،<br>
      [اسمك]</p>
    </div>
  `,
};

// Send single email
export async function POST(request: NextRequest) {
    try {
        const { to, template, personalization } = await request.json();

        if (!to || !template) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const name = personalization?.name || 'عزيزي';
        const company = personalization?.company || 'شركتك';

        let subject = '';
        let html = '';

        switch (template) {
            case 'introduction':
                subject = `فرصة تعاون مع ${company}`;
                html = templates.introduction(name, company);
                break;
            case 'followUp1':
                subject = `Re: فرصة تعاون مع ${company}`;
                html = templates.followUp1(name);
                break;
            case 'followUp2':
                subject = `آخر رسالة - استشارة مجانية لـ ${company}`;
                html = templates.followUp2(name, company);
                break;
            default:
                return NextResponse.json({ error: 'Invalid template' }, { status: 400 });
        }

        if (!resend) {
            return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
        }

        const result = await resend.emails.send({
            from: 'Blore Agency <onboarding@resend.dev>',
            to: to,
            subject: subject,
            html: html,
        });

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Send bulk emails (campaign)
export async function PUT(request: NextRequest) {
    try {
        const { leads, template, delay = 5000 } = await request.json();

        if (!leads || !Array.isArray(leads) || leads.length === 0) {
            return NextResponse.json({ error: 'No leads provided' }, { status: 400 });
        }

        const results = [];

        for (let i = 0; i < leads.length; i++) {
            const lead = leads[i];

            try {
                const name = lead.name || 'عزيزي';
                const company = lead.company || 'شركتك';

                let subject = '';
                let html = '';

                switch (template) {
                    case 'introduction':
                        subject = `فرصة تعاون مع ${company}`;
                        html = templates.introduction(name, company);
                        break;
                    case 'followUp1':
                        subject = `Re: فرصة تعاون مع ${company}`;
                        html = templates.followUp1(name);
                        break;
                    case 'followUp2':
                        subject = `آخر رسالة - استشارة مجانية لـ ${company}`;
                        html = templates.followUp2(name, company);
                        break;
                }

                if (!resend) {
                    results.push({ email: lead.email, success: false, error: 'Email service not configured' });
                    continue;
                }

                const result = await resend.emails.send({
                    from: 'Blore Agency <onboarding@resend.dev>',
                    to: lead.email,
                    subject: subject,
                    html: html,
                });

                results.push({ email: lead.email, success: true, result });

                // Delay between emails to avoid spam
                if (i < leads.length - 1) {
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            } catch (error: any) {
                results.push({ email: lead.email, success: false, error: error.message });
            }
        }

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        console.error('Error sending bulk emails:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
