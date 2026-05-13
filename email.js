const express = require('express');
const app = express();

require('dotenv').config();
const nodemailer = require('nodemailer');

app.use(express.json());

// ======================
// Nodemailer Transporter
// ======================

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// ======================
// Verify Connection
// ======================

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// ======================
// Generate Random OTP
// ======================

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// ======================
// Send Email Function
// ======================

const sendEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Hlo from Nitish" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`,
      html: `
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire soon.</p>
      `,
    });

    console.log('Message sent:', info.messageId);

    return true;

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// ======================
// API Route
// ======================

app.get('/send-email', async (req, res) => {

  try {

    const otp = generateOTP();

    const isSent = await sendEmail('ytm8582@gmail.com', otp);

    if (!isSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email',
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP email sent successfully',
      otp,
    });

  } catch (error) {

    console.error('Route Error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

// ======================
// Start Server
// ======================

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});