import React, { useState } from "react";

const Dashboard = () => {
  // Sample data for the pages
  const [pages, setPages] = useState([
    { id: 1, name: "Home", status: "Published", lastUpdated: "2024-12-01" },
    { id: 2, name: "Baby Shower", status: "Draft", lastUpdated: "2024-11-25" },
    { id: 3, name: "Birthday", status: "Published", lastUpdated: "2024-12-03" },
    { id: 4, name: "Wedding", status: "Published", lastUpdated: "2024-12-02" },
    { id: 5, name: "Contact", status: "Published", lastUpdated: "2024-11-29" },
    { id: 6, name: "Login", status: "Draft", lastUpdated: "2024-12-01" },
    { id: 7, name: "Signup", status: "Published", lastUpdated: "2024-12-03" },
  ]);

  // Handle delete page
  const handleDelete = (id) => {
    const updatedPages = pages.filter((page) => page.id !== id);
    setPages(updatedPages);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Pages Dashboard</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Page Name</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id}>
              <td>{page.name}</td>
              <td>{page.status}</td>
              <td>{page.lastUpdated}</td>
              <td>
                <button style={styles.button}>Edit</button>
                <button style={styles.button}>Preview</button>
                <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => handleDelete(page.id)}>
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

// Inline styles for simplicity
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  button: {
    marginRight: "10px",
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#FF5733",
  },
};

export default Dashboard;
