import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const videos = [
    { id: 1, url: "https://www.youtube.com/embed/VCob9XHw8gQ", price: 500, title: "Elegant Wedding Invitation" },
    { id: 2, url: "https://www.youtube.com/embed/5AXXrf-a0qI", price: 800, title: "Modern Wedding Invite" },
  ];

  const handleEditClick = (video) => {
    navigate("/edit-video", { state: { video } });
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-primary mb-4" onClick={() => navigate("/add-video")}>
        Add New Video
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>{video.price}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(video)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
