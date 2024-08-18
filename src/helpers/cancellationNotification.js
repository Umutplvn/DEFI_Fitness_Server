const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "defifitnessapp@gmail.com",
    pass: process.env.pass,
  },
});

const sendCancellationEmail = async (email) => {
  try {
    const mailOptions = {
      from: 'defifitnessapp@gmail.com',
      to: email,
      subject: 'Your Subscription Has Been Cancelled',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px; border: 1px solid #ced4da;">
        <p style="margin-bottom: 15px; font-size: 16px;">Hello,</p>
        <p style="margin-bottom: 15px; font-size: 16px;">We're sorry to inform you that your subscription has been cancelled.</p>
        <p style="font-size: 16px;">If you have any questions or if there's anything we can assist you with, please don't hesitate to contact us.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #666; text-align: center;">Best regards,<br>DEFI Team</p>
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 10px;">Toronto, Canada</p>
      </div>`
    };

    await transporter.sendMail(mailOptions);
    console.log('Cancellation email sent successfully');
  } catch (error) {
    console.error('Error sending cancellation email:', error);
  }
};

module.exports = sendCancellationEmail;
