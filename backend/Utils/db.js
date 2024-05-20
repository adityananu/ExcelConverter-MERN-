const mongoose = require("mongoose");

const URL = process.env.MONOGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("database is Connected");
  } catch (error) {
    res.status(400).json({ message: "error with the database connection" });
  }
};

module.exports = connectDB;
