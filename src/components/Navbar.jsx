import React from "react";
import { NavLink } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import logo from "../assets/L2.png"; // Ensure the correct path
import "../components/Navbar.css";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Wedding", path: "/wedding" },
    { name: "Birthday", path: "/services" },
    { name: "BabyShower", path: "/babyshower" },
    { name: "Contact", path: "/contact" },
  ];

  const isAuthenticated = true; // Example authentication state

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
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
          <ul className="navbar-nav mx-auto">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <NavLink
                  className="nav-link text-dark"
                  to={item.path}
                  activeClassName="active"
                  exact
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
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
