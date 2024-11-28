import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const MainNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
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
          <Nav.Link href="/" className="text-dark">Home</Nav.Link>
          <Nav.Link href="/wedding" className="text-dark">Wedding</Nav.Link>
          <Nav.Link href="/birthday" className="text-dark">Birthday</Nav.Link>
          <Nav.Link href="/baby-shower" className="text-dark">Baby Shower</Nav.Link>
          <Nav.Link href="/contact" className="text-dark">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
