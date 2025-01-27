const path = require("path");
const fs = require('fs');
const https = require('https');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const cors = require('cors');
const multiparty = require('connect-multiparty');
const cloudinary = require('cloudinary');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const xssClean = require('xss-clean'); 
const mongoSanitize = require('express-mongo-sanitize'); 
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const winston = require('winston');


dotenv.config();


const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY_FILE)),
    cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CRT_FILE))
};

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse request bodies (for forms, JSON, etc.)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1 * 60 * 1000 ,
        secure: true,
        httpOnly: false 
        
    }
}));

app.use((req, res, next) => {
    if (req.session) {
        console.log(`Session ID: ${req.sessionID}`);
        console.log(`Session Data: ${JSON.stringify(req.session)}`);
    } else {
        console.log('No session initialized.');
    }
    next();
});

// app.get('/set-session', (req, res) => {
//     req.session.username = 'testuser';
//     res.send('Session has been set!');
// });

// app.get('/get-session', (req, res) => {
//     if (req.session.username) {
//         res.send(`Session value: ${req.session.username}`);
//     } else {
//         res.send('No session found.');
//     }
// });


const corsPolicy = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsPolicy));


app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'", 
            "https://js.stripe.com", 
            "https://www.google.com", 
            "https://www.gstatic.com", 
            "https://cdn.jsdelivr.net", 
            "https://cdnjs.cloudflare.com" 
        ],
        styleSrc: [
            "'self'",
            "'unsafe-inline'", 
            "https://fonts.googleapis.com", 
            "https://cdn.jsdelivr.net", 
            "https://cdnjs.cloudflare.com" 
        ],
        imgSrc: [
            "'self'",
            "data:", 
            "https://*.stripe.com", 
            "https://www.google.com", 
            "https://www.gstatic.com",
            "https://cdn.jsdelivr.net", 
            "https://cdnjs.cloudflare.com" 
        ],
        fontSrc: [
            "'self'",
            "https://fonts.gstatic.com", 
            "https://cdnjs.cloudflare.com" 
        ],
        connectSrc: [
            "'self'",
            "https://api.stripe.com", 
            "https://www.google.com", 
            "https://www.gstatic.com", 
            "https://*.sentry.io" 
        ],
        frameSrc: [
            "'self'",
            "https://js.stripe.com", 
            "https://www.google.com", 
            "https://www.gstatic.com" 
        ],
        objectSrc: ["'none'"], 
        upgradeInsecureRequests: [], 
        blockAllMixedContent: [], 
        baseUri: ["'self'"],
        formAction: ["'self'"], 
        frameAncestors: ["'self'"], 
    }
}));



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);


app.use(xssClean());


app.use(mongoSanitize());

connectDB();

app.use(express.json());


app.use(multiparty());


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



app.get('/test', (req, res) => {
    res.send('Hello from express server');
});

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/pet', require('./routes/petRoute'));
app.use('/api/adopt', require('./routes/adoptionRoute'));
app.use('/api/event', require('./routes/eventRoute'));
app.use('/api/contact', require('./routes/contactRoute'));


const PORT = process.env.PORT || 5000;

const logger = winston.createLogger({
    level: 'info', 
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({ filename: 'server.log' }) 
    ]
});

https.createServer(sslOptions, app).listen(PORT, () => {
    logger.info(`HTTPS Server is running on port ${PORT}`);
})

module.exports = app;
