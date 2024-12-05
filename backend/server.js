const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/babyshower")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define schemas and models

// Baby Shower form schema
const formDataSchema = new mongoose.Schema({
  name: String,
  time: String,
  age: String,
  venue: String,
  date: String,
  message: String,
  photos: [String], // Array of photo file paths
});

const FormData = mongoose.model("FormData", formDataSchema);

// Contact Form schema
const contactFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  comment: { type: String, required: true },
});

const ContactFormData = mongoose.model("ContactFormData", contactFormSchema);

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
