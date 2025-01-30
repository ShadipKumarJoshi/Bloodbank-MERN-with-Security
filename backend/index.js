const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary");
const connectDB = require("./database/db");
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');


const app = express();
dotenv.config();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());

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
        maxAge: 15 * 60 * 1000 ,
        secure: true,
        httpOnly: false
       
    }
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);


app.use(xssClean());
app.use(helmet());
app.use(mongoSanitize());


const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running!! on ${PORT}`);
});

const corsPolicy = {
  origin: ["https://localhost:3000", "https://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsPolicy));
app.use(multiparty());

// user routes
app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/admin", require("./routes/"))

// bloodBank routes
app.use("/api/bloodbank", require("./routes/bloodBankRoutes"));

// bloodBank routes
app.use("/api/hospital", require("./routes/hospitalRoutes"));

// add request server
app.use("/api/blood_request", require("./routes/bloodRequestRoute"));

app.use("/api/req_bb", require("./routes/requestForBBRoute"));

app.use("/api/contact", require("./routes/contactRoutes"));

app.use("/api/campaign", require("./routes/campaignRoutes"));

app.use("/api/registered_users", require("./routes/registeredUsersRoutes"));

app.use("/api/logs", require("./routes/auditRoute"));

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
 
 


module.exports = {
  connectDB,
};

module.exports = app;
