
// Define schema and model
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