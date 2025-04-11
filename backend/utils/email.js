const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (to, resetLink) => {
  const mailOptions = {
    from: `"foodi Support" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Reset your password",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password. This link is valid for 15 minutes.</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
