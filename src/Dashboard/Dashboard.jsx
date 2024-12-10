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
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editedUrl, setEditedUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Fetch all links from the backend
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/links");
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
  }, []);

  // Add a new link
  const handleAddLink = async () => {
    if (newLink.trim()) {
      try {
        const newEntry = { component: currentComponent, url: newLink, price: 0 };
        // Optimistic UI Update
        setLinks((prevLinks) => ({
          ...prevLinks,
          [currentComponent]: [...prevLinks[currentComponent], newEntry],
        }));

        const response = await axios.post("http://localhost:5000/api/links", newEntry);
        setNewLink("");
        showAlert("Link added successfully!");
      } catch (error) {
        console.error("Error adding link:", error);
        showAlert("Failed to add link.");
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
            link.id === editingLinkId ? { ...link, url: editedUrl } : link
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
      await axios.delete(`http://localhost:5000/api/links/${id}`);
      setLinks((prevLinks) => ({
        ...prevLinks,
        [currentComponent]: prevLinks[currentComponent].filter((link) => link.id !== id),
      }));
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

  // Show error messages
  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark flex-column align-items-start" style={{ minHeight: "100vh", minWidth: "250px" }}>
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
        <div>
          <h3>{`Customize ${currentComponent.charAt(0).toUpperCase() + currentComponent.slice(1)} Links`}</h3>
          {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="input-group my-3">
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="form-control"
              placeholder={`Add new ${currentComponent} link`}
            />
            <button className="btn btn-primary" onClick={handleAddLink}>
              Add Link
            </button>
          </div>

          <div>
            {links[currentComponent].map((link) => (
              <div key={link.id} className="d-flex justify-content-between align-items-center">
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                <button
                  className="btn btn-info ms-2"
                  onClick={() => {
                    setEditingLinkId(link.id);
                    setEditedUrl(link.url);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-danger ms-2" onClick={() => handleDeleteLink(link.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Edit Modal */}
          {editingLinkId && (
            <div className="modal show" style={{ display: "block" }} tabIndex="-1" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Link</h5>
                    <button type="button" className="btn-close" onClick={() => setEditingLinkId(null)}></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      value={editedUrl}
                      onChange={(e) => setEditedUrl(e.target.value)}
                      className="form-control"
                      placeholder="Enter new URL"
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setEditingLinkId(null)}>
                      Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSaveLink}>
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
