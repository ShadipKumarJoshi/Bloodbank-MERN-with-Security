const xss = require("xss-clean");

// Middleware to sanitize all inputs
const sanitizeMiddleware = xss();

module.exports = sanitizeMiddleware;


