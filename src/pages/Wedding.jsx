import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./wedding.css"; // Include this if you are adding custom styles
function WeddingForm() {
  const [formData, setFormData] = useState({
    brideName: "",
    brideParentsName: "",
    brideAddress: "",
    groomName: "",
    groomParentsName: "",
    groomAddress: "",
    haldiCeremony: "",
    engagement: "",
    reception: "",
    weddingDate: "",
    venue: "",
    bridePhotos: null,
    groomPhotos: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch("https://videolens-7.onrender.com/api/weddingse", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Wedding details submitted successfully!");
        setFormData({
          brideName: "",
          brideParentsName: "",
          brideAddress: "",
          groomName: "",
          groomParentsName: "",
          groomAddress: "",
          haldiCeremony: "",
          engagement: "",
          reception: "",
          weddingDate: "",
          venue: "",
          bridePhotos: null,
          groomPhotos: null,
        });
      } else {
        alert("Error submitting form.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form.");
    }
  };

 const [videos, setVideos] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(1499);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("https://videolens-7.onrender.com/api/links/wedding");
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
  const itemsPerPage = 9;
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
       {/* wedding */}
       <div className="wedding">
        <section className="py-5">
          <div className="container text-center px-lg-5">
            <h2 className="mb-5">Wedding Invitation Video</h2>
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


      {/* Select Video Template  */}
      
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


  {/* wedding  form  */}

    <div className="container my-5 d-flex justify-content-center">
  <div className="form-container">
    <h2 className="text-center py-4 mb-3">Send Wedding Details</h2>
    <form onSubmit={handleSubmit}>
      <h4>Bride's Details</h4>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="brideName">Bride Name</label>
          <input
            type="text"
            className="form-control"
            id="brideName"
            name="brideName"
            value={formData.brideName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="brideParentsName">Bride's Parents Name</label>
          <input
            type="text"
            className="form-control"
            id="brideParentsName"
            name="brideParentsName"
            value={formData.brideParentsName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="brideAddress">Bride's Address</label>
          <textarea
            className="form-control"
            id="brideAddress"
            name="brideAddress"
            rows="3"
            value={formData.brideAddress}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <h4>Groom's Details</h4>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="groomName">Groom Name</label>
          <input
            type="text"
            className="form-control"
            id="groomName"
            name="groomName"
            value={formData.groomName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="groomParentsName">Groom's Parents Name</label>
          <input
            type="text"
            className="form-control"
            id="groomParentsName"
            name="groomParentsName"
            value={formData.groomParentsName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="groomAddress">Groom's Address</label>
          <textarea
            className="form-control"
            id="groomAddress"
            name="groomAddress"
            rows="3"
            value={formData.groomAddress}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <h4>Event Details</h4>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="haldiCeremony">Haldi Ceremony</label>
          <input
            type="text"
            className="form-control"
            id="haldiCeremony"
            name="haldiCeremony"
            value={formData.haldiCeremony}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="engagement">Engagement</label>
          <input
            type="text"
            className="form-control"
            id="engagement"
            name="engagement"
            value={formData.engagement}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="reception">Reception</label>
          <input
            type="text"
            className="form-control"
            id="reception"
            name="reception"
            value={formData.reception}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="groomPhotos">Groom's Photo</label>
          <input
            type="file"
            className="form-control"
            id="groomPhotos"
            name="groomPhotos"
            onChange={handleFileChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="bridePhotos">Bride's Photo</label>
          <input
            type="file"
            className="form-control"
            id="bridePhotos"
            name="bridePhotos"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <h4>Wedding Details</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="weddingDate">Wedding Date</label>
          <input
            type="date"
            className="form-control"
            id="weddingDate"
            name="weddingDate"
            value={formData.weddingDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="venue">Venue</label>
          <input
            type="text"
            className="form-control"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary my-4">
            Submit Details
          </button>
    </form>
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
}

export default WeddingForm;
