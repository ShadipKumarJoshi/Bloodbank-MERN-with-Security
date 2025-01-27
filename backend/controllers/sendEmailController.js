const nodemailer = require('nodemailer');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'application.log' })
    ]
});

const sendEmailController = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_Password,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: to,
      subject: subject,
      text: text,
    });

    logger.info("Email sent successfully", { to, subject, response: info.response });
    return true; 
  } catch (error) {
    logger.error("Error sending email", { error: error.message });
    return false; 
  }
};

module.exports = { sendEmailController };
