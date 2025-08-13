import nodemailer from 'nodemailer'

// Create transporter only if SMTP credentials are provided
const transporter = process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // If no transporter is configured, log the email instead of sending
  if (!transporter) {
    console.log('📧 Email would be sent (SMTP not configured):')
    console.log(`To: ${options.to}`)
    console.log(`Subject: ${options.subject}`)
    console.log(`Content: ${options.text || 'HTML content provided'}`)
    return true // Return true for demo purposes
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@globaldogrescue.org',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    console.log('Email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

export async function sendDonationConfirmationEmail(donationData: {
  donorEmail: string
  donorName: string
  amount: number
  currency: string
  donationType: string
  paymentMethod: string
  transactionId: string
}): Promise<boolean> {
  const { donorEmail, donorName, amount, currency, donationType, paymentMethod, transactionId } = donationData

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You for Your Donation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .donation-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
        .amount { font-size: 2em; font-weight: bold; color: #10b981; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🐕 Thank You for Your Generosity!</h1>
          <p>Your donation helps save lives</p>
        </div>
        
        <div class="content">
          <p>Dear ${donorName},</p>
          
          <p>Thank you so much for your generous donation to Save Paws. Your contribution makes a real difference in the lives of abandoned and rescued dogs around the world.</p>
          
          <div class="donation-details">
            <h3>Donation Details</h3>
            <p><strong>Amount:</strong> <span class="amount">${currency.toUpperCase()} $${amount}</span></p>
            <p><strong>Type:</strong> ${donationType === 'ONE_TIME' ? 'One-time donation' : `${donationType.toLowerCase()} recurring donation`}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <h3>What Your Donation Accomplishes:</h3>
          <ul>
            <li>🏥 Emergency medical care for rescued dogs</li>
            <li>🍽️ Food and shelter for animals in need</li>
            <li>🏠 Support for finding forever homes</li>
            <li>🌍 Global rescue operations</li>
          </ul>
          
          <p>You will receive a tax-deductible receipt for your records. If you have any questions about your donation, please don't hesitate to contact us.</p>
          
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/our-impact" class="button">See Your Impact</a>
          
          <p>With heartfelt gratitude,<br>
          <strong>The Save Paws Team</strong></p>
        </div>
        
        <div class="footer">
          <p>Save Paws | Saving Lives Worldwide</p>
          <p>If you have any questions, contact us at help@globaldogrescue.org</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
    Thank you for your donation to Save Paws!
    
    Donation Details:
    Amount: ${currency.toUpperCase()} $${amount}
    Type: ${donationType === 'ONE_TIME' ? 'One-time donation' : `${donationType.toLowerCase()} recurring donation`}
    Payment Method: ${paymentMethod}
    Transaction ID: ${transactionId}
    Date: ${new Date().toLocaleDateString()}
    
    Your generosity helps us rescue, rehabilitate, and rehome abandoned dogs worldwide.
    
    Thank you for making a difference!
    
    The Save Paws Team
  `

  return await sendEmail({
    to: donorEmail,
    subject: 'Thank You for Your Donation - Save Paws',
    html,
    text,
  })
}

export async function sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Save Paws</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🐕 Welcome to Save Paws!</h1>
        </div>
        
        <div class="content">
          <p>Dear ${userName},</p>
          
          <p>Welcome to the Save Paws community! Thank you for joining our mission to save and rehome abandoned dogs worldwide.</p>
          
          <p>As a member of our community, you'll receive updates about our rescue operations, success stories, and ways you can help make a difference.</p>
          
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/rescue-stories" class="button">Read Success Stories</a>
          
          <p>Together, we can save more lives!</p>
          
          <p>Best regards,<br>
          <strong>The Save Paws Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({
    to: userEmail,
    subject: 'Welcome to Save Paws',
    html,
  })
}
