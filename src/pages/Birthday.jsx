import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../pages/Birthday.css";

function Birthday() {
  const [birthday, setFormData] = useState({
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

    Object.entries(birthday).forEach(([key, value]) => {
      if (key === "photos") {
        Array.from(value).forEach((file) =>
          formDataToSend.append("photos", file)
        );
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/birthday-form", {
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

  // Video data with prices
  const videos = [
    {
      url: "https://www.youtube.com/embed/VCob9XHw8gQ",
      price: 1990,
      gateway: "1001",
    },
    {
      url: "https://www.youtube.com/embed/5AXXrf-a0qI",
      price: 1990,
      gateway: "1001",
    },
    {
      url: "https://www.youtube.com/embed/I79wCjSO-wQ",
      price: 1490,
      gateway: "1006",
    },
    {
      url: "https://www.youtube.com/embed/OetacTm0H0c",
      price: 1490,
      gateway: "1006",
    },
    {
      url: "https://www.youtube.com/embed/Yhxai8LauDY",
      price: 1990,
      gateway: "1001",
    },
    {
      url: "https://www.youtube.com/embed/PXMKVBgL6pI",
      price: 1490,
      gateway: "1006",
    },
    {
      url: "https://www.youtube.com/embed/OetacTm0H0c",
      price: 1490,
      gateway: "1006",
    },
    {
      url: "https://www.youtube.com/embed/Yhxai8LauDY",
      price: 1990,
      gateway: "1001",
    },
    {
      url: "https://www.youtube.com/embed/PXMKVBgL6pI",
      price: 1490,
      gateway: "1006",
    },
    {
      url: "https://www.youtube.com/embed/OetacTm0H0c",
      price: 1490,
      gateway: "1006",
    },
    {
      url: "https://www.youtube.com/embed/Yhxai8LauDY",
      price: 1990,
      gateway: "1001",
    },
    {
      url: "https://www.youtube.com/embed/PXMKVBgL6pI",
      price: 1490,
      gateway: "1006",
    },
  ];

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const handlePaymentClick = (price, gateway) => {
    setSelectedPrice(price);
    setVideoTitle(`Video Template`);
    const paymentUrl =
      gateway === "1001"
        ? `https://payments.cashfree.com/forms/we1001?amount=${price}`
        : `https://payments.cashfree.com/forms/we1006?amount=${price}`;
    setPaymentUrl(paymentUrl);

    const modal = new bootstrap.Modal(document.getElementById("paymentModal"));
    modal.show();
  };

  // Pagination state
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
                      className="btn"
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
      </div>




      <div className="container-fluid  mb-5 text-white vediosection py-5">
        <div className="row mx-5 g-5">
          {/* Step 1: Select Video Template */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-film me-3 mb-5"
                style={{ fontSize: "2rem" }}
              ></i>
              <div>
                <h5 className="pb-2">Select Video Template</h5>

                <p className="mb-0">
                  Select a video template from a wide range templates
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Place Your Order */}
          <div className="col-md-3 ">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-tag me-3 mb-5"
                style={{ fontSize: "2rem" }}
              ></i>
              <div>
                <h5>Place Your Order</h5>
                <p className="mb-0">
                  Place an order for the selected video invitation template
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Send Your Details */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-envelope me-3 mb-5"
                style={{ fontSize: "2rem" }}
              ></i>
              <div>
                <h5>Send Your Details</h5>
                <p className="mb-0">
                  Send your required details and photos for the video
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Get Your Video */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-whatsapp me-3 mb-5"
                style={{ fontSize: "2rem" }}
              ></i>
              <div>
                <h5>Get Your Video</h5>
                <p className="mb-0">
                  We will edit your video and deliver it via WhatsApp or
                  Telegram within 24 to 48 hours.
                </p>
              </div>
            </div>
          </div>
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
                value={birthday.name}
                onChange={handleChange}
                className="form-control"
              />
              <label className="mt-4">Event Time</label>
              <input
                type="text"
                name="time"
                value={birthday.time}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 col-lg-3">
              <label>Birthday Age</label>
              <input
                type="text"
                name="age"
                value={birthday.age}
                onChange={handleChange}
                className="form-control"
              />
              <label className="mt-4">Event Venue</label>
              <input
                type="text"
                name="venue"
                value={birthday.venue}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 col-lg-3">
              <label>Event Date</label>
              <input
                type="date"
                name="date"
                value={birthday.date}
                onChange={handleChange}
                className="form-control"
              />
              <label className="mt-4">Message</label>
              <input
                type="text"
                name="message"
                value={birthday.message}
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
              <small className="text-muted">
                You can upload up to 3 files.
              </small>
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
