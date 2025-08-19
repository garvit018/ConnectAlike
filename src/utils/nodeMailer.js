import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"MovieMailer" <no-reply@movie.com>',
      to,
      subject,
      text,
      html: "<b>Hello User, we are happy that you joined our family. Kind Regards, FilmTeam.</b>",
    });

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail Error: ", error.message);
    throw error;
  }
};
