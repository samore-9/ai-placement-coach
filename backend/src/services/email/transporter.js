import nodemailer from 'nodemailer';
import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';

export const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465,
  auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
});

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    await transporter.sendMail({
      from: env.smtp.from || '"AI Placement Coach" <no-reply@aiplacementcoach.com>',
      to,
      subject,
      html,
      text,
    });
  } catch (error) {
    // Email failures should not crash the request that triggered them
    // (e.g. registration should still succeed even if the welcome email fails)
    logger.error(`Failed to send email to ${to}: ${error.message}`);
  }
};
