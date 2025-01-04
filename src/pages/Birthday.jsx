import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../pages/Birthday.css";

function Birthday() {
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    age: "",
    venue: "",
    date: "",
    message: "",
    photos: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, photos: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append all fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "photos") {
        Array.from(value).forEach((file) => formDataToSend.append("photos", file));
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("https://videolens-7.onrender.com/birthday-form", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          time: "",
          age: "",
          venue: "",
          date: "",
          message: "",
          photos: null,
        });
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  const [videos, setVideos] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(1499);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("https://videolens-7.onrender.com/api/links/birthday");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);

  const handlePaymentClick = (price) => {
    setVideoTitle(`Video Template`);
    
    let paymentUrl = "";
    
    // Check price and set payment gateway URL
    if (price === 1999) {
      paymentUrl = "https://payments.cashfree.com/forms/we1001?amount=1999"; // Gateway 1001 for ₹1999
    } else if (price === 1499) {
      paymentUrl = "https://payments.cashfree.com/forms/we1006?amount=1499"; // Gateway 1006 for ₹1499
    } else if (price === 999) { // Correctly using 'else if'
      paymentUrl = "https://payments.cashfree.com/forms/bd1004?amount=999"; // Default gateway for ₹999
    }
  
    setPaymentUrl(paymentUrl);
  
    const modal = new bootstrap.Modal(document.getElementById("paymentModal"));
    modal.show();
  };
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const paginatedVideos = videos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [showScrollButton, setShowScrollButton] = useState(false);
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
      {/* Baby Shower Invitation Video Section */}
      <div className="birthday">
        <section className="py-5">
          <div className="container text-center px-lg-5">
            <h2 className="mb-5">Birthday Invitation Video</h2>
            <div className="row g-3">
              {paginatedVideos.map((video, index) => (
                <div
                  className="col-lg-4 px-4 col-md-6 col-sm-12 mb-4"
                  key={index}
                >
                  <div className="card">
                    <iframe
                      src={video.url}
                      title={`Video ${index + 1}`}
                      className="card-img-top"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "10px",
                      }}
                    ></iframe>
                  </div>
                  <div className="card-body mx-auto my-3">
                    <button
                      className="btn "
                      onClick={() =>
                        handlePaymentClick(video.price, video.gateway)
                      }
                    >
                      ₹&nbsp;{video.price}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-end mt-4">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePaginationClick(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePaginationClick(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePaginationClick(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>

      {/* Payment Modal (Full screen) */}
      <div className="modal fade" id="paymentModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen modal-dialog-centered">
          <div
            className="modal-content"
            style={{ border: "none", boxShadow: "none" }}
          >
            <div
              className="modal-body p-0"
              style={{ backgroundColor: "transparent" }}
            >
              {paymentUrl ? (
                <iframe
                  src={paymentUrl}
                  style={{
                    width: "100%",
                    height: "100vh",
                    border: "none",
                  }}
                  title="Payment Gateway"
                ></iframe>
              ) : (
                <p>Loading payment gateway...</p>
              )}
            </div>
          </div>
        </div>
      </div>

     {/* Steps Section */}
     <div className="container-fluid px-lg-5  mb-5 text-white py-5 vediosection">
        <div className="row">
          {[{
            icon: "film",
            title: "Select Video Template",
            description: "Select a video template from a wide range of templates"
          }, {
            icon: "tag",
            title: "Place Your Order",
            description: "Place an order for the selected video invitation template"
          }, {
            icon: "envelope",
            title: "Send Your Details",
            description: "Send your required details and photos for the video"
          }, {
            icon: "whatsapp",
            title: "Get Your Video",
            description: "We will edit your video and deliver it via WhatsApp or Telegram within 24 to 48 hours."
          }].map((step, index) => (
            <div className="col-md-3" key={index}>
              <div className="d-flex px-5 align-items-center my-2">
                <i
                  className={`bi bi-${step.icon} me-3 mb-5`}
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h5>{step.title}</h5>
                  <p className="mb-0">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className="container my-5 form">
        <h2 className="text-center mb-4">Send Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="row p-5 birth">
            <div className="col-12 col-lg-3">
              <label>Birthday Person Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
              <label className="mt-4">Event Time</label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 col-lg-3">
              <label>Birthday Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-control"
              />
              <label className="mt-4">Event Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 col-lg-3">
              <label>Event Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-control"
              />
              <label className="mt-4">Message</label>
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 col-lg-3">
              <label htmlFor="photos" className="form-label">
                Photos
              </label>
              <input
                type="file"
                className="form-control py-3"
                id="photos"
                name="photos"
                multiple
                onChange={handleFileChange}
              />
              <small className="text-muted">You can upload up to 3 files.</small>
            </div>
            <div className="col-12 col-lg-3 mt-4">
              <button className="btn btn-danger" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
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
}

export default Birthday;
