import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, company, phone, service, budget, message } = await request.json();

    // --- إعدادات آمنة باستخدام متغيرات البيئة ---
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // هذا هو حساب جوجل الذي يرسل
        pass: process.env.EMAIL_PASS, // كلمة مرور التطبيقات الخاصة به
      },
    });

    // --- إعدادات الرسالة ---
    const mailOptions = {
      from: email, // البريد الخاص بالعميل
      to: process.env.EMAIL_TO, // <-- التعديل: سيقرأ info@bloreagency.com من Vercel
      replyTo: email, // مهم جدًا: لكي تتمكن من الرد على العميل مباشرة
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
        <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
        <hr>
        <h2>Message:</h2>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}