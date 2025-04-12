import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "aymenhadouara@gmail.com", // your email
    pass: "rlod pksj cxum bzou", // the app password you generated, paste without spaces
  },
  secure: true,
  port: 465,
});

export async function notifyUser(
  to: string,
  subject: string,
  text?: string,
  html?: string
) {
  try {
    await transporter.sendMail({
      to: to, // the email address you want to send an email to
      subject: subject, // The title or subject of the email
      text: text, // The content of the email, you can send it as plain text or html
      html: html, // I like sending my email as html, you can send \
      // emails as html or as plain text
    });
  } catch (e) {
    console.log("Error while sending email", e);
  }
}
