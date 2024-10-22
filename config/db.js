const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Mongodb Database successfully`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
