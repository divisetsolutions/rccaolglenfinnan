const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password
  }
});

exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  const { name, email, message } = data;

  const mailOptions = {
    from: email,
    to: 'your-parish-email@example.com', // Replace with your parish email
    subject: `New Contact Form Submission from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('There was an error sending the email:', error);
    return { success: false, error: error.message };
  }
});
