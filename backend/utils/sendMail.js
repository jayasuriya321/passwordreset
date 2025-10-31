// backend/utils/sendMail.js
import Brevo from "@getbrevo/brevo";

export const sendMail = async (to, subject, text) => {
  try {
    const client = new Brevo.TransactionalEmailsApi();
    client.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

    const emailData = {
      sender: { name: "Password Reset", email: process.env.SMTP_USER },
      to: [{ email: to }],
      subject,
      textContent: text,
    };

    await client.sendTransacEmail(emailData);
    console.log("📧 Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Email could not be sent");
  }
};
