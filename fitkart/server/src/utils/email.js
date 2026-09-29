import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  family: 4, // Force IPv4 to fix Render's ENETUNREACH IPv6 issue
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
  socketTimeout: 10000,
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
