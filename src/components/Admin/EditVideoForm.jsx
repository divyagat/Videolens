import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EditVideoForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve video data from location state
  const videoData = location.state?.video || { url: "", price: "", title: "" };

  const [formData, setFormData] = useState(videoData);

  useEffect(() => {
    if (!videoData) {
      alert("No video data available!");
      navigate("/dashboard");
    }
  }, [videoData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: Update the video on the backend server
    // Use a fetch/axios call to send `formData` to your server

    alert("Video updated successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <h2>Edit Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            Video URL
          </label>
          <input
            type="url"
            className="form-control"
            id="url"
            name="url"
            placeholder="Enter YouTube video URL"
            value={formData.url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price (₹)
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Video Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter video title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update Video
        </button>
      </form>
    </div>
  );
}

export default EditVideoForm;
