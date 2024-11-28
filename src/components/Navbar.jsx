import React from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import logo from "../assets/L2.png"; // Ensure the correct path
import "../components/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <img src={logo} className="img-fluid imgl2" alt="Company Logo" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto text-dark">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/wedding">Wedding</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/services">Birthday</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/babyshower">BabyShower</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <FiPhoneCall className="fs-5 me-2" />
          <p className="phonenum mb-0">9518745852</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
