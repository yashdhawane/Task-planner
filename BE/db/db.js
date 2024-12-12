const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGO_URL; // Replace with your MongoDB URI
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (e) {
    console.error(e);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectToDatabase;