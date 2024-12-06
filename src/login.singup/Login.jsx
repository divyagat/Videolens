import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importing the CSS file

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username/email and password match
    if (credentials.username === "pushkar" && credentials.password === "pushkar3011") {
      // Store login state and username/email in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", credentials.username);
      navigate("/dashboard"); // Navigate to the Dashboard
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <form className="login-form px-4" onSubmit={handleSubmit}>
        <h2 className="login-title mb-4">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="form-control login-input my-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="form-control login-input"
        />
        <button type="submit" className="btn text-white mt-3 w-25 border login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
