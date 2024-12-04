const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    name: String,
    time: String,
    age: String,
    venue: String,
    date: String,
    message: String,
    photos: [String],
});

module.exports = mongoose.model("Form", formSchema);
