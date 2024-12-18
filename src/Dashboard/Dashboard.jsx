import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Dashboard/Dashboard.css";

function Dashboard() {
  const [currentComponent, setCurrentComponent] = useState("home");
  const [links, setLinks] = useState({
    home: [],
    babyShower: [],
    wedding: [],
    birthday: [],
  });
  const [newLink, setNewLink] = useState("");
  const [newYouTubeLink, setNewYouTubeLink] = useState("");
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editedUrl, setEditedUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Fetch all links for the current component/category
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/links/${currentComponent}`);
        const categorizedLinks = response.data.reduce((acc, link) => {
          if (!acc[link.component]) {
            acc[link.component] = [];
          }
          acc[link.component].push(link);
          return acc;
        }, {});
        setLinks(categorizedLinks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching links:", error);
        setErrorMessage("Failed to load links. Please try again.");
        setLoading(false);
      }
    };
    fetchLinks();
  }, [currentComponent]);

  // Add a new link
  const handleAddLink = async () => {
    if (newLink.trim()) {
      try {
        const newEntry = { component: currentComponent, url: newLink, price: 0 };
        setLinks((prevLinks) => ({
          ...prevLinks,
          [currentComponent]: [...prevLinks[currentComponent], newEntry],
        }));
        await axios.post("http://localhost:5000/api/links", newEntry);
        setNewLink("");
        showAlert("Link added successfully!");
      } catch (error) {
        console.error("Error adding link:", error);
        showAlert("Failed to add link.");
      }
    }
  };

  // Add a new YouTube link
  const handleAddYouTubeLink = async () => {
    if (newYouTubeLink.trim()) {
      try {
        const newEntry = { component: currentComponent, url: newYouTubeLink, type: "youtube" };
        setLinks((prevLinks) => ({
          ...prevLinks,
          [currentComponent]: [...prevLinks[currentComponent], newEntry],
        }));
        await axios.post("http://localhost:5000/api/links", newEntry);
        setNewYouTubeLink("");
        showAlert("YouTube link added successfully!");
      } catch (error) {
        console.error("Error adding YouTube link:", error);
        showAlert("Failed to add YouTube link.");
      }
    }
  };

  // Save edited link
  const handleSaveLink = async () => {
    if (editedUrl.trim()) {
      try {
        await axios.put(`http://localhost:5000/api/links/${editingLinkId}`, { url: editedUrl });
        setLinks((prevLinks) => ({
          ...prevLinks,
          [currentComponent]: prevLinks[currentComponent].map((link) =>
            link._id === editingLinkId ? { ...link, url: editedUrl } : link
          ),
        }));
        setEditingLinkId(null);
        setEditedUrl("");
        showAlert("Link updated successfully!");
      } catch (error) {
        console.error("Error updating link:", error);
        showAlert("Failed to update link.");
      }
    }
  };

  // Delete a link
  const handleDeleteLink = async (id) => {
    try {
      // First, remove the link from the UI state
      setLinks((prevLinks) => ({
        ...prevLinks,
        [currentComponent]: prevLinks[currentComponent].filter((link) => link._id !== id),
      }));
      
      // Now, delete the link from the database
      await axios.delete(`http://localhost:5000/api/links/${id}`);
      
      showAlert("Link deleted successfully!");
    } catch (error) {
      console.error("Error deleting link:", error);
      showAlert("Failed to delete link.");
    }
  };

  // Show alert messages
  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  if (loading) {
    return <div className="text-center"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark flex-column align-items-start" style={{ height: "100vh" }}>
        <a href="#" className="navbar-brand ms-3 mb-4">
          <i className="bi bi-grid-1x2"></i> My Dashboard
        </a>
        <ul className="navbar-nav flex-column w-100">
          {["home", "babyShower", "wedding", "birthday"].map((category) => (
            <li key={category} className="nav-item">
              <button
                className={`nav-link btn w-100 text-start ${currentComponent === category ? "active" : ""}`}
                onClick={() => setCurrentComponent(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button className="btn btn-danger mt-auto w-100" onClick={() => navigate("/")}>
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h3>{`Customize ${currentComponent.charAt(0).toUpperCase() + currentComponent.slice(1)} Links`}</h3>
        {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

       

        {/* Add New YouTube Link */}
        <div className="input-group my-3">
          <input
            type="text"
            value={newYouTubeLink}
            onChange={(e) => setNewYouTubeLink(e.target.value)}
            className="form-control"
            placeholder="Add new YouTube link"
          />
          <button className="btn btn-primary" onClick={handleAddYouTubeLink}>
            Add YouTube Link
          </button>
        </div>

        {/* Display Links */}
        <div>
          {(links[currentComponent] && links[currentComponent].length > 0) ? (
            links[currentComponent].map((link) => (
              <div key={link._id} className="d-flex justify-content-between align-items-center mb-3">
                {link.type === "youtube" ? (
                  <iframe
                    width="200"
                    height="100"
                    src={link.url.replace("watch?v=", "embed/")}
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                )}
                <div>
                  <button
                    className="btn btn-info ms-2"
                    onClick={() => {
                      setEditingLinkId(link._id);
                      setEditedUrl(link.url);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger ms-2" onClick={() => handleDeleteLink(link._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No links available for this category.</p>
          )}
        </div>

        {/* Edit Link Modal */}
        {editingLinkId && (
          <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Link</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setEditingLinkId(null)}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    value={editedUrl}
                    onChange={(e) => setEditedUrl(e.target.value)}
                    className="form-control"
                    placeholder="Edit the link"
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingLinkId(null)}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveLink}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
