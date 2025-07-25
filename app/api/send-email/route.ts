import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, company, phone, service, budget, message } = await request.json();

    // --- إعدادات إرسال البريد ---
    // استبدل 'YOUR_GMAIL_ADDRESS' و 'YOUR_GMAIL_APP_PASSWORD' ببياناتك
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bloreagency@gmail.com', // ضع هنا إيميلك الذي ستستقبل عليه الرسائل
        pass: 'imsa jmwl xhbv rvrt', // ضع هنا كلمة مرور التطبيقات التي ستنشئها
      },
    });

    // --- إعدادات الرسالة ---
    const mailOptions = {
      from: email, // البريد المرسل
      to: 'bloreagency@gmail.com', // البريد المستقبل (بريدك)
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