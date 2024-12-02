import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import logo from "../assets/L2.png"; // Replace with the correct path to your logo
import "./Navbar.css"; // Ensure your CSS file path is correct

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Wedding", path: "/wedding" },
    { name: "Birthday", path: "/birthday" },
    { name: "BabyShower", path: "/babyshower" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
{/* <<<<<<< Updated upstream */}
       {/* <Link to="/"><img src={logo} className="img-fluid imgl2" alt="Company Logo" /></Link>  */}
{/* ======= */}
        {/* Logo */}
        <img src={logo} className="img-fluid navbar-logo" alt="Company Logo" />

        {/* Hamburger Menu for Mobile */}
{/* >>>>>>> Stashed changes */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto ">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item px-2">
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

        {/* Contact Section */}
        <div className="d-flex align-items-center">
          <FiPhoneCall className="fs-5 me-2" />
          <a
            href="https://wa.me/9518745852"
            className="phonenum text-decoration-none text-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            9518745852
          </a>
        </div>
      </div>
    </nav>



  );
};

export default Navbar;
