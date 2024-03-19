const nodemailer = require('nodemailer');

// Create a test SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'litcode.xyz@gmail.com',
    pass: 'neguxvrkewhwvthr'
  }
});

module.exports = transporter