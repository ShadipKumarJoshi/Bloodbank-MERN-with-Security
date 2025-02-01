// Importing necessary packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const databaseConnection = require("./database/database");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const session = require("express-session");
logger = require("./logger");
// const userRouter = require('./routes/userRoutes'); 
const userRouter = require('./routes/userRoutes'); // Adjust the path as necessary
// const logger = require("/logger");

// Use routers


// Load environment variables
dotenv.config();

// Create Express application instance
const app = express();

app.use('/api', userRouter);
// app.use('/api/user', userRouter);

// 🔹 Security Headers (Helmet)
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));

// 🔹 Secure Session Headers (Prevents Caching of Sensitive Data)
app.use((req, res, next) => {
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  next();
});

// 🔹 CORS Configuration
// const corsOptions = {
//   origin: process.env.CLIENT_URL || "http://localhost:3000", // Ensure frontend URL is set
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

const corsOptions = {
  origin: ["http://localhost:3000"], // Allow frontend requests
  credentials: true, // Allow cookies & authorization headers
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow necessary headers
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


// 🔹 Session Management (Secure & HttpOnly)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secureRandomSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      httpOnly: true, // Prevents client-side JS access
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 Day Session Expiry
    },
  })
);

// 🔹 Middleware for JSON parsing, file uploads, and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Correct usage for serving static files
app.use("/public", express.static(path.join(__dirname, "public")));

// 🔹 Logging Requests (Morgan for debugging)
app.use(morgan("dev"));

// 🔹 Connect to MongoDB
databaseConnection();

// 🔹 Global Rate Limiter (Prevents Abuse & Brute-force)
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, message: "Too many requests. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", globalRateLimiter);


// 🔹 Compression (Improves API response time)
app.use(compression());


// 🔹 Setting up API routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

// 🔹 404 Error Handling (Not Found)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API route not found!",
  });
});

// 🔹 Global Error Handler (Handles Unexpected Errors)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  logger.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error! Please try again later.",
  });
});

// 🔹 Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!!!`);
});


module.exports = app;
