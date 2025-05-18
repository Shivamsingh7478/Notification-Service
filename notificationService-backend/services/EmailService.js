const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, auth }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: auth.user,
        pass: auth.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Notifier" <${auth.user}>`,
      to,
      subject,
      text,
    });

    console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error.message);
    return { success: false, error };
  }
};

module.exports = { sendEmail };
