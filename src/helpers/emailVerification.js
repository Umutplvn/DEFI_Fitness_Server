const nodemailer = require('nodemailer');

// Create a transport object using SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'defifitnessapp@gmail.com', // Replace with your Gmail email address
    pass: 'vimg gcbr mgqg vxzf' // Replace with your Gmail app password
  }
});

const sendVerificationEmail = (email, passcode, name) => {
  const mailOptions = {
    from: 'defifitnessapp@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px; border: 1px solid #ced4da;">
    <p style="margin-bottom: 15px; font-size: 16px;">Hello ${name},</p>
    <p style="margin-bottom: 15px; font-size: 16px;">Thank you for registering with DEFI! As the final step to complete your registration process, please find your passcode below:</p>
    <p style="background-color: #f4f4f4; padding: 10px">
        <strong style="color: #3C9387; font-weight: bold; font-size: 16px;">Passcode: ${passcode}</strong>
    </p>
    <p style="font-size: 16px;">If you have any questions or need further assistance, feel free to reach out to us. We're here to help.</p>
    <p style="margin-top: 20px; font-size: 14px; color: #666; text-align: center;">Best regards,<br>DEFI Team</p>
    <p style="font-size: 12px; color: #888; text-align: center; margin-top: 10px;">Toronto, Canada</p>
</div>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendVerificationEmail;
