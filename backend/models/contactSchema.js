// models/contactSchema.js
const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  comment: { type: String, required: true },
});

const ContactFormData = mongoose.model("ContactFormData", contactFormSchema);
module.exports = ContactFormData;
