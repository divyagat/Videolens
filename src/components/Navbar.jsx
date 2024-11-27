import React from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import "../components/Navbar.css"

const Navbar = () => {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container">
        <img src="src/assets/L2.png " className="img-fluid imgl2" alt=""/>
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
          <ul className="navbar-nav mx-auto text-dark">
            <li className="nav-item">
              <Link className="nav-link text-dark " to="/">Home</Link>
            </li>&nbsp;&nbsp;
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/wedding">Wedding</Link>
            </li>&nbsp;&nbsp;
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/services">Birthday</Link>
            </li>&nbsp;&nbsp;
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">BabyShower</Link>
            </li>&nbsp;&nbsp;
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <FiPhoneCall className="fs-5"/>        
        </div>&nbsp;&nbsp;
        <div className="phonenum mt-3">
        <p>9518745852</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
