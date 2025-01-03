const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config(); // Load environment variables

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connections
mongoose.connect(process.env.MONGO_URI_MAIN, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to dashboardDB"))
  .catch((err) => console.error("Error connecting to dashboardDB:", err));

const secondDbConnection = mongoose.createConnection(process.env.MONGO_URI_SECOND, { useNewUrlParser: true, useUnifiedTopology: true });
secondDbConnection.on("connected", () => console.log("Connected to vediolence"));
secondDbConnection.on("error", (err) => console.error("Error connecting to vediolence:", err));


// Define schema for `dashboardDB`
const linkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, default: "regular" },
  price: { type: Number, default: 0 },
  component: { type: String, required: true },
});
const Home = mongoose.model("Home", linkSchema);
const Wedding = mongoose.model("Wedding", linkSchema);
const Birthday = mongoose.model("Birthday", linkSchema);
const BabyShower = mongoose.model("BabyShower", linkSchema);

// Define schemas for `vediolence`
const babyShowerSchema = new mongoose.Schema({
  name: String,
  time: String,
  age: Number,
  venue: String,
  date: String,
  message: String,
  photos: [String],
});
const birthdaySchema = new mongoose.Schema({
  name: String,
  time: String,
  age: Number,
  venue: String,
  date: String,
  message: String,
  photos: [String],
});
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  comment: String,
});
const weddingSchema = new mongoose.Schema({
  brideName: String,
  brideParentsName: String,
  groomName: String,
  groomParentsName: String,
  brideAddress: String,
  groomAddress: String,
  haldiCeremony: String,
  engagement: String,
  reception: String,
  weddingDate: String,
  venue: String,
  bridePhotos: String,
  groomPhotos: String,
});

const FormData = secondDbConnection.model("BabyShower", babyShowerSchema);
const BirthdayData = secondDbConnection.model("Birthday", birthdaySchema);
const ContactFormData = secondDbConnection.model("Contact", contactSchema);
const WeddingData = secondDbConnection.model("Wedding", weddingSchema);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Utility function
const getModelByComponent = (component) => {
  switch (component) {
    case "home":
      return Home;
    case "wedding":
      return Wedding;
    case "birthday":
      return Birthday;
    case "babyShower":
      return BabyShower;
    default:
      return null;
  }
};

// Routes for `dashboardDB`
app.get("/api/links/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const Link = getModelByComponent(category);
    if (!Link) return res.status(400).json({ error: "Invalid category" });

    const links = await Link.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

app.post("/api/links", async (req, res) => {
  const { component, url, type, price } = req.body;
  const Link = getModelByComponent(component);
  if (!Link) return res.status(400).json({ error: "Invalid component" });

  const newLink = new Link({ url, type, price, component });
  try {
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: "Failed to save link" });
  }
});

app.put("/api/links/:category/:id", async (req, res) => {
  const { id, category } = req.params;
  const { url, price } = req.body;
  const Link = getModelByComponent(category);
  if (!Link) return res.status(400).json({ error: "Invalid component" });

  try {
    const link = await Link.findByIdAndUpdate(id, { url, price }, { new: true });
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: "Failed to update link" });
  }
});

app.delete("/api/links/:category/:id", async (req, res) => {
  const { id, category } = req.params;
  const Link = getModelByComponent(category);
  if (!Link) return res.status(400).json({ error: "Invalid component" });

  try {
    await Link.findByIdAndDelete(id);
    res.json({ message: "Link deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete link" });
  }
});

// Routes for `vediolence`
app.post("/submit-form", upload.array("photos", 3), async (req, res) => {
  try {
    const { name, time, age, venue, date, message } = req.body;
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
    res.status(200).json({ message: "Baby shower form data saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error saving form data" });
  }
});

app.post("/birthday-form", upload.array("photos", 3), async (req, res) => {
  try {
    const { name, time, age, venue, date, message } = req.body;
    const photoPaths = req.files.map((file) => `/uploads/${file.filename}`);

    const newBirthdayData = new BirthdayData({
      name,
      time,
      age,
      venue,
      date,
      message,
      photos: photoPaths,
    });

    await newBirthdayData.save();
    res.status(200).json({ message: "Birthday form data saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error saving form data" });
  }
});

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
    res.status(500).json({ error: "Error saving contact form data" });
  }
});

app.post(
  "/api/weddingse",
  upload.fields([
    { name: "bridePhotos", maxCount: 1 },
    { name: "groomPhotos", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const weddingData = new WeddingData({
        brideName: req.body.brideName,
        brideParentsName: req.body.brideParentsName,
        groomName: req.body.groomName,
        groomParentsName: req.body.groomParentsName,
        brideAddress: req.body.brideAddress,
        groomAddress: req.body.groomAddress,
        haldiCeremony: req.body.haldiCeremony,
        engagement: req.body.engagement,
        reception: req.body.reception,
        weddingDate: req.body.weddingDate,
        venue: req.body.venue,
        bridePhotos: req.files["bridePhotos"]
          ? req.files["bridePhotos"][0].path
          : "",
        groomPhotos: req.files["groomPhotos"]
          ? req.files["groomPhotos"][0].path
          : "",
      });

      await weddingData.save();
      res.status(200).send("Wedding data saved successfully.");
    } catch (error) {
      res.status(500).send("Error saving wedding data.");
    }
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
