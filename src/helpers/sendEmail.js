const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'defifitnessapp@gmail.com', 
        pass: process.env.pass 
    }
});

const sendEmail = (to, subject, html) => {
    const mailOptions = {
        from: 'defifitnessapp@gmail.com',
        to: to,
        subject: subject,
        html: html, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
