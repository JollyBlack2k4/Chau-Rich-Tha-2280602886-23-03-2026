require('dotenv').config();
const nodemailer = require('nodemailer');

// Mailtrap email configuration
const mailConfig = {
  host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
  port: process.env.MAILTRAP_PORT || 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
};

const transporter = nodemailer.createTransport(mailConfig);

module.exports = transporter;
