// models/birthdaySchema.js
const mongoose = require("mongoose");

const birthdayDataSchema = new mongoose.Schema({
  name: String,
  time: String,
  age: String,
  venue: String,
  date: String,
  message: String,
  photos: [String], // Array of photo file paths
});

const birthdayData = mongoose.model("birthday", birthdayDataSchema);
module.exports = birthdayData;
