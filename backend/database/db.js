
const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            info("Connected to Database");
        })
        .catch(error => {
            error("Database connection error", { error: error.message });
        });
}


module.exports = connectDB;
