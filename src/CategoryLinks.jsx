import React, { useEffect, useState } from "react";
import axios from "axios";
const CategoryVideos = ({ category }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/links/${category}`
        );
        setVideos(response.data);
      } catch (err) {
        setError("Failed to fetch videos");
        console.error(err);
      }
    };

    fetchVideos();
  }, [category]);

  return (
    <div>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Videos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video._id} className="video-item">
            {/* If the URL is a YouTube link, render an iframe */}
            {video.url.includes("youtube.com") || video.url.includes("youtu.be") ? (
              <iframe
                src={video.url.replace("watch?v=", "embed/")}
                title={video.component}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              // Otherwise, render the video tag for direct video URLs
              <video controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <p>{video.type} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryVideos;
