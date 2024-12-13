const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Link Schema
const linkSchema = new mongoose.Schema({
  url: String,
  price: Number,
  component: String, // For categorizing (home, babyShower, wedding, birthday)
});

const Link = mongoose.model("Link", linkSchema);

// Routes

// Fetch all links for a given component (home, babyShower, wedding, birthday)
app.get("/api/links", async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

// Add a new link
app.post("/api/links", async (req, res) => {
  try {
    const { url, component } = req.body;
    const newLink = new Link({ url, component, price: 0 });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ error: "Failed to add link" });
  }
});

// Update a link
app.put("/api/links/:id", async (req, res) => {
  try {
    const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLink);
  } catch (err) {
    res.status(500).json({ error: "Failed to update link" });
  }
});

// Delete a link
app.delete("/api/links/:id", async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete link" });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
