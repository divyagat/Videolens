// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
<<<<<<< Updated upstream
require("dotenv").config();  // Load environment variables from .env file

// Import schema models
const FormData = require("./models/babyShowerSchema");
const birthdayData = require("./models/birthdaySchema");
const ContactFormData = require("./models/contactSchema");
const Wedding = require("./models/weddingSchema");

=======
>>>>>>> Stashed changes
const app = express();
const PORT = process.env.PORT || 5000;  // Use the port from .env file or default to 5000

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/vediolence")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to handle file uploads and save Baby Shower form data
app.post("/submit-form", upload.array("photos", 3), async (req, res) => {
  try {
    const { name, time, age, venue, date, message } = req.body;

    // Save the file paths in the database
    const photoPaths = req.files.map((file) => `/uploads/${file.filename}`);

    const newFormData = new FormData({
      name,
      time,
      age,
      venue,
      date,
      message,
      photos: photoPaths,
    });

    await newFormData.save();
    res.status(200).json({ message: "Form data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving form data" });
  }
});

// Route to handle file uploads and save Birthday form data
app.post("/birthday-form", upload.array("photos", 3), async (req, res) => {
  try {
    const { name, time, age, venue, date, message } = req.body;

    // Save the file paths in the database
    const photoPaths = req.files.map((file) => `/uploads/${file.filename}`);

    const newFormData = new birthdayData({
      name,
      time,
      age,
      venue,
      date,
      message,
      photos: photoPaths,
    });

    await newFormData.save();
    res.status(200).json({ message: "Wedding form data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving form data" });
  }
});

// Route to handle contact form submissions
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, comment } = req.body;

    const newContactData = new ContactFormData({
      name,
      email,
      subject,
      comment,
    });

    await newContactData.save();
    res.status(200).json({ message: "Contact data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving contact form data" });
  }
});

// API endpoint to handle wedding form submission
app.post("/api/wedding", upload.fields([
  { name: "bridePhotos", maxCount: 1 },
  { name: "groomPhotos", maxCount: 1 },
]), async (req, res) => {
  try {
    const weddingData = new Wedding({
      brideName: req.body.brideName,
      brideParentsName: req.body.brideParentsName,
      groomName: req.body.groomName,
      groomParentsName: req.body.groomParentsName,
      address: req.body.address,
      haldiCeremony: req.body.haldiCeremony,
      engagement: req.body.engagement,
      reception: req.body.reception,
      weddingDate: req.body.weddingDate,
      venue: req.body.venue,
      bridePhotos: req.files["bridePhotos"] ? req.files["bridePhotos"][0].path : "",
      groomPhotos: req.files["groomPhotos"] ? req.files["groomPhotos"][0].path : "",
    });

    await weddingData.save();
    res.status(200).send("Wedding data saved successfully.");
  } catch (error) {
    console.error("Error saving wedding data", error);
    res.status(500).send("Error saving wedding data.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
