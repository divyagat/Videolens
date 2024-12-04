const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/babyshower", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

// Import Model
const Form = require("./models/Form");

// Multer for File Uploads
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Create Uploads Folder if not exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// API Routes
app.post("/submit", upload.array("photos", 3), async (req, res) => {
    try {
        const formData = req.body;
        formData.photos = req.files.map(file => file.filename);

        const form = new Form(formData);
        await form.save();

        res.status(201).json({ message: "Form data saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save form data" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
