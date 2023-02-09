const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

async function nodemailerSendMail({ to, html, subject }) {
  const email = {
    from: 'info@mymovies.com',
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
}
async function sendSendGridMailer() {}

module.exports = {
  nodemailerSendMail,
  sendSendGridMailer,
};
