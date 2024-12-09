const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let videos = [
  { id: uuidv4(), url: "https://www.youtube.com/embed/VCob9XHw8gQ", price: 500 },
  { id: uuidv4(), url: "https://www.youtube.com/embed/5AXXrf-a0qI", price: 800 },
];

// Get all videos
app.get("/api/videos", (req, res) => {
  res.json(videos);
});

// Add a new video
app.post("/api/videos", (req, res) => {
  const { url, price } = req.body;
  const newVideo = { id: uuidv4(), url, price };
  videos.push(newVideo);
  res.status(201).json(newVideo);
});

// Edit a video
app.put("/api/videos/:id", (req, res) => {
  const { id } = req.params;
  const { url, price } = req.body;
  const video = videos.find((v) => v.id === id);
  if (video) {
    video.url = url;
    video.price = price;
    res.json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// Delete a video
app.delete("/api/videos/:id", (req, res) => {
  const { id } = req.params;
  videos = videos.filter((v) => v.id !== id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
