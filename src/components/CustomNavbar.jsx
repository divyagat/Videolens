import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";
import "../components/navbar.css"
const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Navbar.Brand href="/" className="d-flex align-items-center">
        <img
          src="/path-to-your-logo.png"
          alt="Logo"
          style={{ width: "40px", marginRight: "10px" }}
        />
        <span>Video Lens</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className="text-light">Home</Nav.Link>
          <Nav.Link href="/wedding" className="text-light">Wedding</Nav.Link>
          <Nav.Link href="/birthday" className="text-light">Birthday</Nav.Link>
          <Nav.Link href="/baby-shower" className="text-light">Baby Shower</Nav.Link>
          <Nav.Link href="/contact" className="text-light">Contact</Nav.Link>
        </Nav>
        <div className="d-flex align-items-center">
          <a
            href="mailto:thevideolens@gmail.com"
            className="text-light me-3 text-decoration-none"
          >
            thevideolens@gmail.com
          </a>
          <span className="text-light me-3">9970753038</span>
          <a href="#" className="text-light me-2">
            <FaFacebook />
          </a>
          <a href="#" className="text-light me-2">
            <FaInstagram />
          </a>
          <a href="#" className="text-light me-2">
            <FaYoutube />
          </a>
          <a href="#" className="text-light">
            <FaTelegram />
          </a>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
