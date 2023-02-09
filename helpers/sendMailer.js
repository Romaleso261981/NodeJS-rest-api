require('dotenv').config();
const nodemailer = require('nodemailer');
// const sendGrid = require('@sendgrid/mail');

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

// async function sendSendGridMailer() {
//   async function main() {
//     try {
//       sendGrid.setApiKey(SEND_GRID_KEY);

//       const email = {
//         // from: "bob@gmail.com", // not verified email
//         from: 'Ladiginscormag@gmail.com',
//         to: 'Ladiginscormag@gmail.com',
//         subject: 'Sendgrid Test 1',
//         html: '<h1> Hello there! </h1>', //
//         text: 'Hello there!',
//       };

//       const response = await sendGrid.send(email);
//       console.log(response);
//     } catch (error) {
//       console.error('App error:', error);
//     }
//   }
//   main();
// }

module.exports = {
  nodemailerSendMail,
};
