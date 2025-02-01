const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',  // Set the default minimum log level
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }), // Log the stack trace in case of errors
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),  // Colorize the output to the console
        winston.format.simple()  // Use a simple format for console output
      )
    }),
    // File transport
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

module.exports = logger;
