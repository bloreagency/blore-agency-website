import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { addSubscriber } from '@/lib/newsletter-storage';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Add subscriber to storage
    const result = await addSubscriber(email, 'website');

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Send welcome email with Resend (only if API key is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'BLORE Agency <onboarding@resend.dev>', // Replace with your verified domain
          to: email,
          subject: '🎉 Welcome to BLORE Agency Newsletter!',
          html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                                .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>🎉 Welcome to BLORE Agency!</h1>
                                </div>
                                <div class="content">
                                    <h2>Thank you for subscribing!</h2>
                                    <p>We're thrilled to have you join our community. You'll now receive:</p>
                                    <ul>
                                        <li>✨ Latest design trends and insights</li>
                                        <li>🚀 Exclusive project showcases</li>
                                        <li>💡 Marketing tips and strategies</li>
                                        <li>🎁 Special offers and updates</li>
                                    </ul>
                                    <p>Stay tuned for amazing content coming your way!</p>
                                    <a href="https://bloreagency.com" class="button">Visit Our Website</a>
                                </div>
                                <div class="footer">
                                    <p>© ${new Date().getFullYear()} BLORE Agency. All rights reserved.</p>
                                    <p>You're receiving this email because you subscribed to our newsletter.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `,
        });
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
