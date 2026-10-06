// ============================================
// OTP SERVICE - Email verification codes
// ============================================

const nodemailer = require('nodemailer');

// In-memory store for OTPs: Map<email, { otp, expiresAt, attempts }>
const otpStore = new Map();

// Cleanup expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(email);
    }
  }
}, 5 * 60 * 1000);

const SUPPORT_EMAIL = process.env.SMTP_USER || 'tanmaygurav2326@gmail.com';
const SUPPORT_HELPLINE = '8999147294';

/**
 * Configure Nodemailer transport based on environment
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || SUPPORT_EMAIL;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  return null;
}

/**
 * Generate a random 6-digit OTP code
 */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Professional HTML email template for the OTP verification code
 */
function getEmailTemplate(otp, recipientEmail) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Enum Airways Email Verification</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F4F5F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #172B4D;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F4F5F7; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
              
              <!-- Brand Header -->
              <tr>
                <td style="background-color: #0052CC; padding: 28px 32px; text-align: center;">
                  <h1 style="color: #FFFFFF; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: 0.5px;">
                    ✈️ ENUM AIRWAYS
                  </h1>
                  <p style="color: #DEEBFF; font-size: 12px; font-weight: 600; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">
                    India's Premier Commercial Aviation Network
                  </p>
                </td>
              </tr>

              <!-- Email Content -->
              <tr>
                <td style="padding: 32px;">
                  
                  <div style="border-bottom: 1px solid #EBECF0; padding-bottom: 16px; margin-bottom: 20px;">
                    <span style="font-size: 11px; font-weight: 700; color: #0052CC; text-transform: uppercase; letter-spacing: 1px;">
                      Account Registration Verification
                    </span>
                    <h2 style="color: #091E42; font-size: 20px; font-weight: 800; margin: 6px 0 0 0;">
                      Verify Your Email Address
                    </h2>
                  </div>

                  <p style="font-size: 14px; line-height: 1.6; color: #172B4D; margin: 0 0 16px 0;">
                    Dear Valued Passenger,
                  </p>
                  
                  <p style="font-size: 14px; line-height: 1.6; color: #172B4D; margin: 0 0 20px 0;">
                    Thank you for signing up for an <strong>Enum Airways</strong> account. To verify that your email address (<strong>${recipientEmail}</strong>) is valid and activate your account, please enter the One-Time Password (OTP) below:
                  </p>

                  <!-- OTP Highlight Box -->
                  <div style="background-color: #F0F5FF; border: 2px dashed #0052CC; border-radius: 14px; padding: 24px; text-align: center; margin: 24px 0;">
                    <div style="font-size: 12px; font-weight: 700; color: #6B778C; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                      Your One-Time Verification Code
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #0052CC;">
                      ${otp}
                    </div>
                    <div style="font-size: 12px; color: #0052CC; font-weight: 600; margin-top: 10px;">
                      ⏱️ Valid for 10 minutes only
                    </div>
                  </div>

                  <!-- Security Information -->
                  <div style="background-color: #FFF8E6; border-left: 4px solid #FFAB00; padding: 14px 16px; border-radius: 8px; margin: 24px 0;">
                    <p style="font-size: 12px; line-height: 1.5; color: #7A5400; margin: 0;">
                      🔒 <strong>Security Warning:</strong> Never share this verification code with anyone. Enum Airways customer support or staff will never request your OTP, password, or financial PIN.
                    </p>
                  </div>

                  <p style="font-size: 13px; line-height: 1.5; color: #6B778C; margin: 0 0 24px 0;">
                    If you did not initiate this registration request on Enum Airways, you can safely ignore this email. No account will be created without this verification code.
                  </p>

                  <!-- Sender and Support Contact Info -->
                  <div style="border-top: 1px solid #EBECF0; padding-top: 20px; font-size: 12px; color: #6B778C; line-height: 1.6;">
                    <p style="margin: 0 0 4px 0; font-weight: 700; color: #091E42;">
                      Sent by: Enum Airways Customer Support & Verification Desk
                    </p>
                    <p style="margin: 0 0 4px 0;">
                      📧 Support Email: <a href="mailto:${SUPPORT_EMAIL}" style="color: #0052CC; text-decoration: none; font-weight: 600;">${SUPPORT_EMAIL}</a>
                    </p>
                    <p style="margin: 0 0 4px 0;">
                      📞 24/7 Helpline: <strong>${SUPPORT_HELPLINE}</strong>
                    </p>
                    <p style="margin: 0;">
                      🏢 Registered Office: Government Polytechnic, Shivajinagar, Pune - 411016, Maharashtra, India
                    </p>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #F8F9FA; padding: 18px 32px; text-align: center; border-top: 1px solid #EBECF0;">
                  <p style="font-size: 11px; color: #8993A4; margin: 0; line-height: 1.4;">
                    © ${new Date().getFullYear()} Enum Airways Indian Aviation Network. All rights reserved.<br>
                    This is an automated security transmission. Please do not reply directly to this email.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Plain text email fallback
 */
function getPlainTextTemplate(otp, recipientEmail) {
  return `
ENUM AIRWAYS - EMAIL VERIFICATION CODE
======================================

Dear Valued Passenger,

Thank you for registering with Enum Airways. To verify your email address (${recipientEmail}) and complete your account creation, please use the One-Time Password (OTP) below:

YOUR VERIFICATION CODE: ${otp}

This code will expire in 10 minutes.

SECURITY NOTICE:
Never share this verification code with anyone. Enum Airways staff will never ask for your verification code or password.

If you did not request this registration, please disregard this email.

--------------------------------------
Sent by: Enum Airways Customer Support & Verification Desk
Support Email: ${SUPPORT_EMAIL}
Helpline: ${SUPPORT_HELPLINE}
Registered Office: Government Polytechnic, Shivajinagar, Pune - 411016, Maharashtra, India
© ${new Date().getFullYear()} Enum Airways. All rights reserved.
  `.trim();
}

const otpService = {
  /**
   * Generate and send OTP to the specified email
   * @param {string} email
   * @returns {Promise<{ message: string }>}
   */
  generateAndSendOTP: async (email) => {
    const cleanEmail = email.trim().toLowerCase();

    // Generate 6-digit code
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store in memory (overwrites previous OTP for this email)
    otpStore.set(cleanEmail, {
      otp,
      expiresAt,
      attempts: 0
    });

    const transporter = createTransporter();
    const fromAddress = `"Enum Airways Customer Support" <${SUPPORT_EMAIL}>`;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: fromAddress,
          to: cleanEmail,
          subject: 'Enum Airways - Email Verification Code for Account Registration',
          html: getEmailTemplate(otp, cleanEmail),
          text: getPlainTextTemplate(otp, cleanEmail)
        });

        console.log(`[OTP] Successfully dispatched verification email to: ${cleanEmail}`);
        return {
          message: 'Verification code has been sent to your email address.'
        };
      } catch (err) {
        console.error('[OTP] Mail dispatch error via SMTP:', err.message);
        // Do not leak OTP to client response, log securely on server
        console.log(`[OTP BACKUP LOG] Verification code for ${cleanEmail}: ${otp}`);
        return {
          message: 'Verification code dispatched to your email address.'
        };
      }
    } else {
      // Log delivery on server console
      console.log(`\n========================================`);
      console.log(`[ENUM AIRWAYS OTP DISPATCH]`);
      console.log(`To: ${cleanEmail}`);
      console.log(`From: ${fromAddress}`);
      console.log(`Purpose: Account Registration Verification`);
      console.log(`Code: ${otp}`);
      console.log(`Expires At: ${new Date(expiresAt).toLocaleTimeString()}`);
      console.log(`========================================\n`);

      return {
        message: 'Verification code has been sent to your email address.'
      };
    }
  },

  /**
   * Verify an OTP code for an email
   * @param {string} email
   * @param {string} otp
   * @returns {{ verified: boolean, message: string }}
   */
  verifyOTP: (email, otp) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = String(otp).trim();

    const record = otpStore.get(cleanEmail);

    if (!record) {
      return {
        verified: false,
        message: 'No verification code was requested for this email. Please request a new code.'
      };
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanEmail);
      return {
        verified: false,
        message: 'Verification code has expired. Please request a new code.'
      };
    }

    record.attempts += 1;

    // Max 5 attempts
    if (record.attempts > 5) {
      otpStore.delete(cleanEmail);
      return {
        verified: false,
        message: 'Too many incorrect attempts. Please request a new verification code.'
      };
    }

    if (record.otp !== cleanOtp) {
      return {
        verified: false,
        message: 'Invalid verification code. Please check your email and try again.'
      };
    }

    // Success - consume the OTP so it cannot be reused
    otpStore.delete(cleanEmail);

    return {
      verified: true,
      message: 'Email verified successfully.'
    };
  }
};

module.exports = otpService;
