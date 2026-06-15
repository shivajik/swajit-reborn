import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, company, message } = (req.body ?? {}) as Record<string, string>;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }

    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
    const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || GMAIL_USER;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      return res.status(500).json({ error: "Email service is not configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });

    const esc = (s: string) =>
      String(s ?? "").replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
      );

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>New Contact Enquiry</title></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <tr><td style="background:linear-gradient(135deg,#0a2540,#143a6b);padding:28px 32px;color:#ffffff;">
          <div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:.85;">Swajit Engineering</div>
          <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;">New Contact Enquiry</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 18px;font-size:14px;color:#555;">You have received a new message from the Swajit.com contact form.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #eef0f3;width:120px;color:#6b7280;">Name</td><td style="padding:10px 0;border-bottom:1px solid #eef0f3;font-weight:600;">${esc(name)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#6b7280;">Email</td><td style="padding:10px 0;border-bottom:1px solid #eef0f3;"><a href="mailto:${esc(email)}" style="color:#c8102e;text-decoration:none;">${esc(email)}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#6b7280;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #eef0f3;">${esc(phone || "—")}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#6b7280;">Company</td><td style="padding:10px 0;border-bottom:1px solid #eef0f3;">${esc(company || "—")}</td></tr>
          </table>
          <div style="margin-top:22px;">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:8px;">Message</div>
            <div style="background:#f7f9fc;border-left:4px solid #c8102e;padding:14px 16px;border-radius:6px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</div>
          </div>
        </td></tr>
        <tr><td style="background:#0a2540;padding:18px 32px;color:#cbd5e1;font-size:12px;text-align:center;">
          © ${new Date().getFullYear()} Swajit Engineering Pvt. Ltd. — Contact Form Notification
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

    await transporter.sendMail({
      from: `"Swajit Website" <${GMAIL_USER}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New Contact Enquiry from ${name}`,
      html,
      text: `New contact enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nCompany: ${company || "-"}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}