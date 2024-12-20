const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema({
  brideName: String,
  brideParentsName: String,
  brideAddress: String,
  groomName: String,
  groomParentsName: String,
  groomAddress: String,
  haldiCeremony: String,
  engagement: String,
  reception: String,
  weddingDate: Date,
  venue: String,
  bridePhotos: String,
  groomPhotos: String,
});

module.exports = mongoose.model("Wedding", weddingSchema);
