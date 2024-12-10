import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import '../Dashboard/Dashboard.css'

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

  const navigate = useNavigate(); // Use navigate for redirection

  // Fetch links for Home, BabyShower, Wedding, and Birthday
  useEffect(() => {
    const fetchLinks = async () => {
      const babyShowerData = [
        { id: 1, url: "https://www.youtube.com/embed/VCob9XHw8gQ?si=B3qoMLMh_NTOVEdk", price: 500 },
        { id: 2, url: "https://www.youtube.com/embed/5AXXrf-a0qI?si=500YJMmw6yz02gR6", price: 800 },
        { id: 3, url: "https://www.youtube.com/embed/I79wCjSO-wQ?si=ecH502jwx4IcvQLhq4g", price: 1000 },
      ];
      const weddingData = [
        { id: 1, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", price: 600 },
        { id: 2, url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", price: 900 },
      ];
      const birthdayData = [
        { id: 1, url: "https://www.youtube.com/watch?v=Zn6nm-23Ilk", price: 400 },
        { id: 2, url: "https://www.youtube.com/watch?v=X5d-TdpmPMM", price: 700 },
      ];
      const homeData = [
        { id: 1, url: "https://www.example.com/link1", price: 300 },
        { id: 2, url: "https://www.example.com/link2", price: 500 },
      ];

      setLinks({
        babyShower: babyShowerData,
        wedding: weddingData,
        birthday: birthdayData,
        home: homeData,
      });

      setLoading(false);
    };
    fetchLinks();
  }, []);

  // Add a new link for any section (Home, BabyShower, Wedding, Birthday)
  const handleAddLink = () => {
    if (newLink.trim()) {
      const newId = links[currentComponent].length + 1;
      const newEntry = { id: newId, url: newLink, price: 0 };
      setLinks((prevLinks) => ({
        ...prevLinks,
        [currentComponent]: [...prevLinks[currentComponent], newEntry],
      }));
      setNewLink("");
      showAlert("Link added successfully!");
    }
  };

  // Handle save after editing the link
  const handleSaveLink = () => {
    if (editedUrl.trim()) {
      setLinks((prevLinks) => ({
        ...prevLinks,
        [currentComponent]: prevLinks[currentComponent].map((link) =>
          link.id === editingLinkId ? { ...link, url: editedUrl } : link
        ),
      }));
      setEditingLinkId(null);
      setEditedUrl("");
      showAlert("Link updated successfully!");
    }
  };

  // Handle edit button click
  const handleEditLink = (id, currentUrl) => {
    setEditingLinkId(id);
    setEditedUrl(currentUrl);
  };

  // Delete a link
  const handleDeleteLink = (id) => {
    setLinks((prevLinks) => ({
      ...prevLinks,
      [currentComponent]: prevLinks[currentComponent].filter((link) => link.id !== id),
    }));
    showAlert("Link deleted successfully!");
  };

  // Show alert messages
  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000); // Hide the message after 3 seconds
  };

  // Render links for the current section
  const renderLinks = () => {
    return (
      <div>
        <h3>Customize {currentComponent.charAt(0).toUpperCase() + currentComponent.slice(1)} Links</h3>
        {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
        <div className="d-flex justify-content-center align-items-center my-3">
          <div className="input-group" style={{ maxWidth: '400px', width: '100%' }}>
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
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links[currentComponent].map((link) => (
              <tr key={link.id}>
                <td>{link.id}</td>
                <td>
                  {editingLinkId === link.id ? (
                    <input
                      type="text"
                      value={editedUrl}
                      className="form-control"
                      onChange={(e) => setEditedUrl(e.target.value)}
                    />
                  ) : (
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.url}
                    </a>
                  )}
                </td>
                <td>
                  {editingLinkId === link.id ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleSaveLink}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditLink(link.id, link.url)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Logout function
  const handleLogout = () => {
    // Clear any session data or reset state
    // Redirect to the home page
    navigate("/"); // This assumes you have a route for the home page
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark flex-column align-items-start"
        style={{ minHeight: "100vh", minWidth: "250px" }}
      >
        <a href="#" className="navbar-brand ms-3 mb-4">
          <i className="bi bi-grid-1x2" ></i>  My Dashboard
        </a>
        <ul className="navbar-nav flex-column w-100">
          <li className="nav-item">
            <button
              className={`nav-link btn w-100 text-start ${currentComponent === "home" ? "active" : ""}`}
              onClick={() => setCurrentComponent("home")}
            >
              <i className="bi bi-house me-2"></i> Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn w-100 text-start ${currentComponent === "babyShower" ? "active" : ""}`}
              onClick={() => setCurrentComponent("babyShower")}
            >
              <i className="bi bi-person-badge me-2"></i> BabyShower
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn w-100 text-start ${currentComponent === "wedding" ? "active" : ""}`}
              onClick={() => setCurrentComponent("wedding")}
            >
              <i className="bi bi-heart me-2"></i> Wedding
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn w-100 text-start ${currentComponent === "birthday" ? "active" : ""}`}
              onClick={() => setCurrentComponent("birthday")}
            >
              <i className="bi bi-balloon me-2"></i> Birthday
            </button>
          </li>
        </ul>
        <button
          className="btn btn-danger mt-auto w-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {renderLinks()}
      </div>
    </div>
  );
}

export default Dashboard;
