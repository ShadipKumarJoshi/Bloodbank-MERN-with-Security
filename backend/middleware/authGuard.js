const jwt = require("jsonwebtoken");
const logger = require('../logger'); // Ensure the path to logger.js is correct

const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        logger.warn('Authorization header not found', {
            url: req.originalUrl,
            method: req.method,
            ip: req.ip
        });
        return res.json({
            success: false,
            message: "Authorization header not found!",
        });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        logger.warn('Token not found', {
            url: req.originalUrl,
            method: req.method,
            ip: req.ip
        });
        return res.json({
            success: false,
            message: "Token not found!",
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decodedUser;

        // Create a log object with the required fields
        const log = {
            userName: req.user.email || 'Unknown', // Use email as an identifier if userName is not available
            sessionId: req.cookies["connect.sid"] || 'Unknown', // Assume the session ID is stored in cookies
            url: req.originalUrl,
            method: req.method,
            
        };

        // Log the user authentication success
        logger.info('User authenticated', log);

        next();
    } catch (error) {
        logger.error('Invalid Token', {
            url: req.originalUrl,
            method: req.method,
            ip: req.ip,
            error: error.message
        });
        return res.json({
            success: false,
            message: "Invalid Token",
        });
    }
};

const authGuardAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        logger.warn('Authorization header not found for admin', {
            url: req.originalUrl,
            method: req.method,
            ip: req.ip
        });
        return res.json({
            success: false,
            message: "Authorization header not found!",
        });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        logger.warn('Token not found for admin', {
            url: req.originalUrl,
            method: req.method,
            ip: req.ip
        });
        return res.json({
            success: false,
            message: "Token not found!",
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decodedUser;

        if (!req.user.isAdmin) {
            logger.warn('Permission denied for non-admin user', {
                userName: req.user.email || 'Unknown',
                sessionId: req.cookies["connect.sid"] || 'Unknown',
                url: req.originalUrl,
                method: req.method,
            });
            return res.json({
                success: false,
                message: "Permission denied",
            });
        }

        // Log the admin authentication success
        logger.info('Admin authenticated', {
            userName: req.user.email || 'Unknown',
            sessionId: req.cookies["connect.sid"] || 'Unknown',
            url: req.originalUrl,
            method: req.method,
        });

        next();
    } catch (error) {
        logger.error('Invalid Token for admin', {
            url: req.originalUrl,
            method: req.method,
            ip: req.ip,
            error: error.message
        });
        return res.json({
            success: false,
            message: "Invalid Token",
        });
    }
};

module.exports = { authGuard, authGuardAdmin };
