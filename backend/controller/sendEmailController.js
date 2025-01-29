// emailSender.js
const nodemailer = require('nodemailer');

const sendEmailController = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "markbase99@gmail.com",
        pass: "hwkh esmi mezr sesw",
      },
    });

    let info = await transporter.sendMail({
      from: "merojagir0@gmail.com",
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Email sent: " + info.response);
    return true; 
  } catch (error) {
    console.error("Error sending email:", error);
    return false; 
  }
};

module.exports = { sendEmailController };