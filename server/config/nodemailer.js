import nodemailer from "nodemailer";

export const sendNotificationEmail = async ({ name, email, message }) => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER || "designstodeploy@gmail.com";
  const pass = process.env.SMTP_PASS || "";

  if (!pass) {
    console.warn("SMTP_PASS not provided. Skipping email send.");
    return { success: false, reason: "SMTP credentials missing" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${user}>`,
    to: process.env.NOTIFICATION_EMAIL || "designstodeploy@gmail.com",
    subject: `New Portfolio Inquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; rounded: 10px;">
        <h2 style="color: #915EFF;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #915EFF; margin: 0;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
        <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #888;">Sent from Designs To Deploy Portfolio System</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Notification Email Sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Nodemailer Email Error:", error.message);
    return { success: false, error: error.message };
  }
};
