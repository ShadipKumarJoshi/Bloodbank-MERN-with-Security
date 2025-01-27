
const mongoose = require('mongoose');
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


const connectDB = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            logger.info("Connected to Database");
        })
        .catch(error => {
            logger.error("Database connection error", { error: error.message });
        });
}


module.exports = connectDB;
