import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Define exactly what the user requested for Gmail App Password Auth
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports (587 uses STARTTLS)
  requireTLS: true, // Forces STARTTLS
  connectionTimeout: 5000, // 5 seconds to prevent hanging
  greetingTimeout: 5000,
  socketTimeout: 5000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const verifyTransporter = async () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_PASS.includes('put_your')) {
    console.warn('\n[SMTP NOTICE]: You have not configured a real Gmail App Password in .env');
    console.warn('[SMTP NOTICE]: Emails will NOT be sent. No OTPs will be printed to console due to security rules.\n');
    return false;
  }
  
  try {
    await transporter.verify();
    console.log(`[SMTP Connected]: Ready to send real emails as ${process.env.EMAIL_USER}`);
    return true;
  } catch (error) {
    console.warn('\n[SMTP NOTICE]: Failed to connect to Gmail.');
    console.warn('[SMTP ERROR DETAILS]:', error.message);
    console.warn('[SMTP NOTICE]: Emails will NOT be sent.\n');
    return false;
  }
};

export default transporter;
