import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Validate API key on initialization
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error('❌ OPENAI_API_KEY is not configured in environment variables');
}

const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key', // Prevent initialization error
});

export async function POST(request: NextRequest) {
    try {
        // Check if API key is configured
        if (!apiKey) {
            console.error('❌ Chatbot request failed: Missing OpenAI API key');
            return NextResponse.json(
                {
                    error: 'Configuration Error',
                    message: 'OpenAI API key is not configured. Please contact the administrator.',
                    code: 'MISSING_API_KEY'
                },
                { status: 500 }
            );
        }

        const { message, conversationHistory = [] } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Invalid request', message: 'Message is required' },
                { status: 400 }
            );
        }

        const systemPrompt = `أنت مساعد مبيعات ذكي لشركة Blore Agency - وكالة تسويق رقمي وتصميم إبداعي.

معلومات الشركة:
- نقدم خدمات: Branding, Web Development, Mobile Apps, Digital Marketing, Motion Graphics, AI Solutions, Cyber Security
- نعمل مع شركات في مصر والسعودية والإمارات
- لدينا خبرة 5+ سنوات
- أكملنا 150+ مشروع ناجح

مهمتك:
1. الترحيب بالزوار بطريقة احترافية ودودة
2. فهم احتياجاتهم (نوع الخدمة، الميزانية، الموعد)
3. جمع معلوماتهم (الاسم، الإيميل، رقم الهاتف، اسم الشركة)
4. تقديم معلومات عن خدماتنا
5. تشجيعهم على حجز استشارة مجانية

أسلوبك:
- ودود ومحترف
- استخدم اللغة العربية أو الإنجليزية حسب لغة العميل
- اطرح أسئلة ذكية لفهم الاحتياجات
- كن مقنعاً لكن غير مزعج
- ركز على القيمة التي نقدمها

إذا طلب العميل التحدث مع شخص، قل له: "بالتأكيد! يمكنك التواصل معنا عبر info@bloreagency.com أو +20 120 294 4459"`;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: message },
        ];

        console.log('🤖 Sending request to OpenAI...');

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages as any,
            temperature: 0.7,
            max_tokens: 500,
        });

        const reply = completion.choices[0].message.content;

        console.log('✅ OpenAI response received successfully');

        return NextResponse.json({
            reply,
            conversationHistory: [...conversationHistory,
            { role: 'user', content: message },
            { role: 'assistant', content: reply }
            ]
        });
    } catch (error: any) {
        console.error('❌ Chatbot error:', error);

        // Handle specific OpenAI errors
        if (error.code === 'invalid_api_key') {
            return NextResponse.json(
                {
                    error: 'Invalid API Key',
                    message: 'The OpenAI API key is invalid. Please check your configuration.',
                    code: 'INVALID_API_KEY'
                },
                { status: 401 }
            );
        }

        if (error.code === 'insufficient_quota') {
            return NextResponse.json(
                {
                    error: 'Quota Exceeded',
                    message: 'OpenAI API quota has been exceeded. Please contact the administrator.',
                    code: 'QUOTA_EXCEEDED'
                },
                { status: 429 }
            );
        }

        if (error.code === 'rate_limit_exceeded') {
            return NextResponse.json(
                {
                    error: 'Rate Limit',
                    message: 'Too many requests. Please try again in a moment.',
                    code: 'RATE_LIMIT'
                },
                { status: 429 }
            );
        }

        // Generic error
        return NextResponse.json(
            {
                error: 'Server Error',
                message: error.message || 'An unexpected error occurred. Please try again.',
                code: 'UNKNOWN_ERROR'
            },
            { status: 500 }
        );
    }
}
