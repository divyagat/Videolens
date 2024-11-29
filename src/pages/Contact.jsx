import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import "./Contact.css"; // Add your CSS file

const Contact = () => {
    return (
        <div className="container my-5">
            <p className="text-center fs-5 text-dark">Contact Us</p>
            <h1 className="text-center mb-3">Get In Touch</h1>
            <div className="row">
                {/* Left Section - Contact Details */}
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

                {/* Right Section - Contact Form */}
                <div className="col-md-6">
                    <h4 className="mb-3">Leave A Reply</h4>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="form-control"
                                placeholder="Subject"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">
                                Comment
                            </label>
                            <textarea
                                id="comment"
                                className="form-control"
                                rows="4"
                                placeholder="Your Comment"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-danger">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
