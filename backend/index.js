const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize the app  
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/dashboardDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define the schema for different categories
const linkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, default: "regular" },
  price: { type: Number, default: 0 },
  component: { type: String, required: true },
});

// Create separate models for each category
const Home = mongoose.model("Home", linkSchema);
const Wedding = mongoose.model("Wedding", linkSchema);
const Birthday = mongoose.model("Birthday", linkSchema);
const BabyShower = mongoose.model("BabyShower", linkSchema);

// Route to fetch links for a category
app.get("/api/links/:category", async (req, res) => {
  try {
    const category = req.params.category;
    let links;
    switch (category) {
      case "home":
        links = await Home.find();
        break;
      case "wedding":
        links = await Wedding.find();
        break;
      case "birthday":
        links = await Birthday.find();
        break;
      case "babyShower":
        links = await BabyShower.find();
        break;
      default:
        return res.status(400).json({ error: "Invalid category" });
    }
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

// Add a new link
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

// Update an existing link
app.put("/api/links/:id", async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  try {
    const link = await Link.findByIdAndUpdate(id, { url }, { new: true });
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: "Failed to update link" });
  }
});

// Delete a link
app.delete("/api/links/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Link.findByIdAndDelete(id);
    res.json({ message: "Link deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete link" });
  }
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
