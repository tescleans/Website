import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend with API Key from environment variables
// Use fallback for build time if env var is missing
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

// Shared email styling
const emailStyles = `
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .email-container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 10px 0 0; opacity: 0.9; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
        .footer { background: #f7fafc; padding: 20px; text-align: center; font-size: 14px; color: #718096; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none; }
        .info-box { background: #f7fafc; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .info-label { font-weight: 600; color: #1e3a5f; min-width: 120px; }
        .highlight { background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; margin: 15px 0; border-radius: 0 8px 8px 0; }
        .cta-button { display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 15px; }
    </style>
`;

export async function POST(request: Request) {
    try {
        const { type, data } = await request.json();

        // 1. Validate Payload
        if (!type || !data) {
            return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
        }

        let adminSubject = '';
        let adminHtmlContent = '';
        let customerSubject = '';
        let customerHtmlContent = '';
        const toEmail = 'Info@tescleans.com';

        // 2. Build Email Content based on Type
        if (type === 'contact') {
            // Admin notification
            adminSubject = `New Contact Form Submission: ${data.name}`;
            adminHtmlContent = `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                    ${data.message}
                </blockquote>
            `;

            // Customer confirmation
            customerSubject = `We've Received Your Message - Total Excellence Services`;
            customerHtmlContent = `
                <!DOCTYPE html>
                <html>
                <head>${emailStyles}</head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <h1>Thank You for Contacting Us!</h1>
                            <p>We've received your message</p>
                        </div>
                        <div class="content">
                            <p>Dear <strong>${data.name}</strong>,</p>
                            <p>Thank you for reaching out to Total Excellence Services. We have received your message and our team will get back to you within 24-48 hours.</p>
                            
                            <div class="highlight">
                                <strong>Your Message:</strong><br/>
                                ${data.message}
                            </div>
                            
                            <p>If you need immediate assistance, please don't hesitate to call us:</p>
                            <p style="font-size: 18px; font-weight: bold; color: #1e3a5f;">📞 (786) 286-1851</p>
                            
                            <p>We look forward to serving you!</p>
                            <p>Best regards,<br/><strong>Total Excellence Services Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>Total Excellence Services, Inc.<br/>
                            6625 Miami Lakes Drive, Suite 411, Miami Lakes, FL 33014<br/>
                            <a href="mailto:Info@tescleans.com">Info@tescleans.com</a> | (786) 286-1851</p>
                            <p style="font-style: italic;">"Cleaning with the Spirit of Excellence"</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
        } else if (type === 'booking') {
            // Admin notification
            adminSubject = `New Booking Request: ${data.service} - ${data.name}`;
            adminHtmlContent = `
                <h2>New Booking Request</h2>
                <p><strong>Service:</strong> ${data.service}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Time:</strong> ${data.time}</p>
                <hr />
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Address:</strong> ${data.address || 'Not provided'}</p>
                <p><strong>City:</strong> ${data.city || 'N/A'}</p>
                <p><strong>Zip:</strong> ${data.zip || 'N/A'}</p>
                <hr />
                <h3>Property Details</h3>
                <p><strong>Square Footage:</strong> ${data.squareFootage || 'Not provided'}</p>
                <p><strong>Bedrooms:</strong> ${data.bedrooms || 'Not provided'}</p>
                <p><strong>Bathrooms:</strong> ${data.bathrooms || 'Not provided'}</p>
                <hr />
                <p><strong>Notes:</strong> ${data.notes || 'None'}</p>
            `;

            // Customer confirmation
            customerSubject = `Booking Request Received - Total Excellence Services`;
            customerHtmlContent = `
                <!DOCTYPE html>
                <html>
                <head>${emailStyles}</head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <h1>Booking Request Received!</h1>
                            <p>We'll confirm your appointment shortly</p>
                        </div>
                        <div class="content">
                            <p>Dear <strong>${data.name}</strong>,</p>
                            <p>Thank you for choosing Total Excellence Services! We have received your booking request and will contact you shortly to confirm your appointment.</p>
                            
                            <div class="info-box">
                                <h3 style="margin-top: 0; color: #1e3a5f;">📋 Booking Summary</h3>
                                <p><strong>Service:</strong> ${data.service}</p>
                                <p><strong>Requested Date:</strong> ${data.date}</p>
                                <p><strong>Requested Time:</strong> ${data.time}</p>
                                ${data.address ? `<p><strong>Location:</strong> ${data.address}</p>` : ''}
                                ${data.squareFootage ? `<p><strong>Square Footage:</strong> ${data.squareFootage} sq ft</p>` : ''}
                                ${data.bedrooms ? `<p><strong>Bedrooms:</strong> ${data.bedrooms}</p>` : ''}
                                ${data.bathrooms ? `<p><strong>Bathrooms:</strong> ${data.bathrooms}</p>` : ''}
                            </div>
                            
                            <div class="highlight">
                                <strong>What's Next?</strong><br/>
                                Our team will review your request and contact you within 24 hours to confirm your appointment and provide a quote if applicable.
                            </div>
                            
                            <p>If you need to make any changes or have questions, please contact us:</p>
                            <p style="font-size: 18px; font-weight: bold; color: #1e3a5f;">📞 (786) 286-1851</p>
                            
                            <p>We look forward to serving you!</p>
                            <p>Best regards,<br/><strong>Total Excellence Services Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>Total Excellence Services, Inc.<br/>
                            6625 Miami Lakes Drive, Suite 411, Miami Lakes, FL 33014<br/>
                            <a href="mailto:Info@tescleans.com">Info@tescleans.com</a> | (786) 286-1851</p>
                            <p style="font-style: italic;">"Cleaning with the Spirit of Excellence"</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
        } else if (type === 'careers') {
            // Verify reCAPTCHA token server-side before proceeding
            const captchaToken = data.captchaToken;
            if (!captchaToken) {
                return NextResponse.json({ error: 'CAPTCHA token missing.' }, { status: 400 });
            }

            const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    secret: process.env.RECAPTCHA_SECRET_KEY || '',
                    response: captchaToken,
                }).toString(),
            });

            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
                console.error('reCAPTCHA verification failed:', verifyData['error-codes']);
                return NextResponse.json({ error: 'CAPTCHA verification failed. Please try again.' }, { status: 400 });
            }

            adminSubject = `New Job Application: ${data.name}`;
            adminHtmlContent = `
                <h2>New Job Application</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <hr />
                <h3>Cover Letter / Message</h3>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                    ${data.message || 'No additional message.'}
                </blockquote>
            `;
            // No customer confirmation needed for careers - they get response during interview process
        } else {
            return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
        }

        // 3. Send Admin Email via Resend
        const adminRes = await resend.emails.send({
            from: 'Total Excellence Services <info@tescleans.com>',
            to: [toEmail],
            replyTo: data.email,
            subject: adminSubject,
            html: adminHtmlContent,
            attachments: data.attachments || [],
        });

        if (adminRes.error) {
            console.error('Resend API Error (Admin):', adminRes.error);
            return NextResponse.json({ error: adminRes.error.message }, { status: 500 });
        }

        // 4. Send Customer Confirmation Email (for contact and booking only)
        if ((type === 'contact' || type === 'booking') && data.email && customerHtmlContent) {
            try {
                const customerRes = await resend.emails.send({
                    from: 'Total Excellence Services <info@tescleans.com>',
                    to: [data.email],
                    subject: customerSubject,
                    html: customerHtmlContent,
                });

                if (customerRes.error) {
                    console.error('Resend API Error (Customer):', customerRes.error);
                    // Don't fail the whole request if customer email fails - admin was notified
                }
            } catch (customerError) {
                console.error('Customer Email Error:', customerError);
                // Don't fail the whole request
            }
        }

        return NextResponse.json({ success: true, id: adminRes.data?.id });

    } catch (error) {
        console.error('Email Route Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}