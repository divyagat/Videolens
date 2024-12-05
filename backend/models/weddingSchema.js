const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
  brideName: String,
  brideParentsName: String,
  groomName: String,
  groomParentsName: String,
  address: String,
  haldiCeremony: String,
  engagement: String,
  reception: String,
  weddingDate: String,
  venue: String,
  bridePhotos: String,
  groomPhotos: String,
});

const Wedding = mongoose.model("Wedding", weddingSchema);
module.exports = Wedding;
