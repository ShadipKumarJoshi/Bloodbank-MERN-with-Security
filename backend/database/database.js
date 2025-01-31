const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

// Function to connect to the database using Mongoose
const databaseConnection = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONOGODB_CLOUD);
    console.log("✅ Database connected successfully!");

    // Event listeners for additional connection status handling
    mongoose.connection.on("connected", () => {
      console.log("🔗 Mongoose connected to the database.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Mongoose disconnected. Reconnecting...");
      connectWithRetry(); // Attempt to reconnect if disconnected
    });
  } catch (error) {
    console.error("❌ Initial database connection failed:", error);
    process.exit(1); // Exit the application if the initial connection fails
  }
};

// Function to retry connection in case of disconnection
const connectWithRetry = () => {
  setTimeout(() => {
    mongoose.connect(process.env.MONOGODB_CLOUD)
      .then(() => console.log("🔄 Reconnected to the database successfully!"))
      .catch((err) =>
        console.error("❌ Failed to reconnect to the database:", err)
      );
  }, 5000); // Retry after 5 seconds
};

// Graceful shutdown for handling application termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 Database connection closed due to application termination.");
  process.exit(0);
});

module.exports = databaseConnection;
