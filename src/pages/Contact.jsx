import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import "./Contact.css"; // Add your CSS file
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      alert("There was an error submitting your message.");
    }
  };

  return (
    <>
      {/* Contact Form Section */}
      <div className="container my-5" id="contact">
        <p className="text-center fs-5 text-dark">Contact Us</p>
        <h1 className="text-center mb-3">Get In Touch</h1>
        <div className="row">
          <div className="col-md-6">
          <h6 className="d-flex" >
                        <span className="icon-box me-3">
                            <CiLocationOn className="text-success "/>
                        </span>
                      <p><strong>Location</strong><br /><br/>  2nd Floor, Saikripa Building, Trimurti Chowk, Pune-46</p>
                    </h6>
                    <h6 className="d-flex"  >
                        <span className="icon-box me-3  ">
                            <FiPhoneCall className="text-success "/>
                        </span>
                       <p><strong>Phone Number</strong><br /><br/> +91 9021769096</p>
                    </h6>
                    <h6 className="d-flex" >
                        <span className="icon-box me-3">
                            <CiMail className="text-success"/>
                        </span>
                        <p><strong>Email Us</strong><br /><br/> thevideolens@gmail.com</p>
                    </h6>
          </div>

          <div className="col-md-6">
            <h4 className="mb-3">Leave A Reply</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  className="form-control"
                  rows="4"
                  placeholder="Your Comment"
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-danger">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
