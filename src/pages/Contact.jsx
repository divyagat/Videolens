import React, { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    comment: "",
  });
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thank you for your message. We'll get back to you soon!");
        setFormData({ name: "", email: "", subject: "", comment: "" });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to send message"}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  // Scroll to Top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Contact Form Section */}
      <div className="container my-5 p-5 px-lg-5" id="contact">
        <p className="text-center fs-5 conp text-success">Contact Us</p>
        <h2 className="text-center mb-5">Get In Touch</h2>
        <div className="row">
          {/* Left Section: Contact Info */}
          <div className="col-md-6 col-12 mb-4">
            <h6 className="d-flex mt-3">
              <a
                href="https://www.google.com/maps?q=2nd+Floor,+Saikripa+Building,+Trimurti+Chowk,+Pune-46"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark d-flex align-items-center"
              >
                <span className="icon-box me-3">
                  <CiLocationOn className="text-success" />
                </span>
                <span>
                  <strong>Location</strong>
                  <br />
                  2nd Floor, Saikripa Building, Trimurti Chowk, Pune-46
                </span>
              </a>
            </h6>
            <h6 className="d-flex mt-3">
              <a
                href="tel:+919021769096"
                className="text-decoration-none text-dark d-flex align-items-center"
              >
                <span className="icon-box me-3">
                  <FiPhoneCall className="text-success" />
                </span>
                <span>
                  <strong>Phone Number</strong>
                  <br />
                  +91 9021769096
                </span>
              </a>
            </h6>
            <h6 className="d-flex mt-3">
              <a
                href="mailto:thevideolens@gmail.com"
                className="text-decoration-none text-dark d-flex align-items-center"
              >
                <span className="icon-box me-3">
                  <CiMail className="text-success" />
                </span>
                <span>
                  <strong>Email Us</strong>
                  <br />
                  thevideolens@gmail.com
                </span>
              </a>
            </h6>
          </div>

          {/* Right Section: Contact Form */}
          <div className="col-md-6 col-12">
            <h4 className="mb-3">Leave A Reply</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-6 mt-3">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control py-3"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-label="Name"
                  />
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control py-3"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="Email"
                  />
                </div>
              </div>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control py-3 mt-5 mb-4"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                aria-label="Subject"
              />
              <textarea
                id="comment"
                name="comment"
                className="form-control my-3"
                rows="4"
                placeholder="Comment"
                value={formData.comment}
                onChange={handleChange}
                aria-label="Comment"
              ></textarea>
              <button type="submit" className="btn btn-danger" aria-label="Submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="btn btn-danger scrollbtn position-fixed bottom-0 end-0"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Contact;
