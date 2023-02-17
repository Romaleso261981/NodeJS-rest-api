require('dotenv').config();
const nodemailer = require('nodemailer');

const { EMAIL_USER, EMAIL_PASS } = process.env;

async function nodemailerSendMail({ to, html, subject }) {
  try {
    const email = {
      from: 'Ladiginscormag@gmail.com',
      to,
      subject,
      html,
    };

    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
    await transport.sendMail(email);
  } catch (error) {
    console.error('app error:', error);
  }
}

module.exports = {
  nodemailerSendMail,
};
