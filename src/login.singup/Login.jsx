import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy authentication
    if (credentials.username === "admin" && credentials.password === "password") {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={credentials.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #2c3e50, #4ca1af)", // Background gradient
  },
  form: {
    width: "30%",
    padding: "20px",
    borderRadius: "10px",
    backdropFilter: "blur(10px)", // Glass effect
    background: "rgba(0, 0, 0, 0.5)", // Black translucent background
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)", // Deep shadow
    textAlign: "center",
    color: "#fff", // White text for contrast
    border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
  },
  title: {
    marginBottom: "20px",
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Slight transparency for inputs
    color: "#fff",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(255, 255, 255, 0.2)", // Subtle shadow
  },
  button: {
    width: "90%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4ca1af",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default Login;
