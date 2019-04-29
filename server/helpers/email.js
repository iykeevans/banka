import nodemailer from 'nodemailer';
import capitalize from './capitalize';

const transport = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
};

const emailSignup = async ({ firstname, lastname, email }) => {
  const transporter = await nodemailer.createTransport(transport);

  const mailOptions = {
    from: '"Banka inc" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Welcome to Banka', // Subject line
    html: `<h1>${capitalize(firstname)} ${capitalize(lastname)}</h1>
    <p>You just successfully registered with Banka</p>
    <p>Go back to the <a href="https://iykeevans.github.io/banka/UI">Website</a> to sign in</p>
    `, // html body
  };

  return transporter.sendMail(mailOptions);
};

const notification = async (transaction) => {
  const transporter = await nodemailer.createTransport(transport);

  const mailOptions = {
    from: '"Banka inc" <foo@example.com>', // sender address
    to: 'krest.swiss@gmail.com', // list of receivers
    subject: 'Banka Transaction Notification Services (Banka ALERT)', // Subject line
    html: `<p>This is to inform you that a transaction has occurred on your account with Banka with details below</p>
      <table style="font-family: arial, sans-serif; border-collapse: collapse; width: 100%;">
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Transaction Type</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${transaction.type.toUpperCase()} ALERT</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Amount</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${transaction.amount}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Account Number</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${transaction.accountNumber}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Date and Time</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${transaction.createdOn}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Old Balance</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${transaction.oldBalance}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">New Balance</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${transaction.newBalance}</td>
      </tr>
    </table>
    `, // html body
  };

  return transporter.sendMail(mailOptions);
};

export { signup, notification };
