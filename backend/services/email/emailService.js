import nodemailer from "nodemailer";

/**
 * EmailService – Nodemailer-based email sender.
 * Configuration is read from environment variables:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM
 */
class EmailService {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this._from = process.env.EMAIL_FROM || "Axaro Store <no-reply@axaro.store>";
  }

  /**
   * Send a single email.
   * @param {object} options
   * @param {string}        options.to       Recipient email
   * @param {string}        options.subject  Email subject
   * @param {string}        [options.text]   Plain-text body
   * @param {string}        [options.html]   HTML body
   */
  async sendMail({ to, subject, text, html }) {
    return this._transporter.sendMail({
      from: this._from,
      to,
      subject,
      text,
      html,
    });
  }

  /** Singleton accessor */
  static getInstance() {
    if (!EmailService._instance) {
      EmailService._instance = new EmailService();
    }
    return EmailService._instance;
  }
}

EmailService._instance = null;

export default EmailService;
