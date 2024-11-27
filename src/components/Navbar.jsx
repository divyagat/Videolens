import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container">
        <Link className="navbar-brand text-dark" to="/">VideoLens</Link>
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
        <div className="collapse navbar-collapse " id="mainNavbar">
          <ul className="navbar-nav ms-auto text-dark">
            <li className="nav-item">
              <Link className="nav-link text-dark " to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/services">Wedding</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/services">Birthday</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">BabyShower</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
