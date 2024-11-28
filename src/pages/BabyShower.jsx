import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../pages/Babyshower.css'
function BabyShower(){

    const [formData, setFormData] = useState({
        motherToBeName: "",
        fatherToBeName: "",
        eventDateTime: "",
        eventVenue: "",
        photos: null,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: files }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Form submitted!");
      };


 // Video data with prices
 const videos = [
    { url: "https://www.youtube.com/embed/VCob9XHw8gQ?si=B3qoMLMh_NTOVEdk", price: 500 },
    { url: "https://www.youtube.com/embed/5AXXrf-a0qI?si=500YJMmw6yz02gR6", price: 800 },
    { url: "https://www.youtube.com/embed/I79wCjSO-wQ?si=ecH502jwx4IcvQLhq4g", price: 1000 },
   ,
  ];

  // State to track selected video, price, and video title
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  // Handle payment button click
  const handlePaymentClick = (price, title) => {
    setSelectedPrice(price);
    setVideoTitle(title); // Set the video title
    setPaymentUrl(`https://payments.cashfree.com/forms/we1001?amount=${price}`);
 // Pass price to payment gateway URL
    const modal = new bootstrap.Modal(document.getElementById("paymentModal"));
    modal.show();
  };
    return(
    <>
      <div className="App">
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">Wedding Invitation Videos</h2>
          <div className="row">
            {videos.map((video, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                <div className="card">
                  <iframe
                    src={video.url}
                    title={`Video ${index + 1}`}
                    className="card-img-top"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "200px" }}
                  ></iframe>
                  <div className="card-body">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handlePaymentClick(video.price, `Video ${index + 1}`)}
                    >
                      ₹{video.price} - Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <div
        className="modal fade"
        id="paymentModal"
        tabIndex="-1"
        aria-labelledby="paymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-centered">
          <div className="modal-content" style={{ border: "none", boxShadow: "none" }}>
            <div className="modal-body p-0" style={{ backgroundColor: "transparent" }}>
              {paymentUrl ? (
                <iframe
                  src={paymentUrl}
                  style={{
                    width: "100%",
                    height: "100vh",  // Full height of the viewport
                    border: "none",    // Remove iframe border
                  }}
                  title="Payment Gateway"
                  scrolling="auto"
                ></iframe>
              ) : (
                <p>Loading payment gateway...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="container-fluid px-5 my-5 text-white bg-dark py-5">
      <div className="row">
        {/* Step 1: Select Video Template */}
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-film me-3" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5>Select Video Template</h5>
              <p className="mb-0">Select a video template from a wide range of templates</p>
            </div>
          </div>
        </div>

        {/* Step 2: Place Your Order */}
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-tag me-3" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5>Place Your Order</h5>
              <p className="mb-0">Place an order for the selected video invitation template</p>
            </div>
          </div>
        </div>

        {/* Step 3: Send Your Details */}
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-envelope me-3" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5>Send Your Details</h5>
              <p className="mb-0">Send your required details and photos for the video</p>
            </div>
          </div>
        </div>

        {/* Step 4: Get Your Video */}
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-whatsapp me-3" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5>Get Your Video</h5>
              <p className="mb-0">We will edit your video and deliver it via WhatsApp or Telegram within 24 to 48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="container mt-5">
      <h2 className="text-center mb-4">Send Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="motherToBeName">Mother To Be Name</label>
            <input
              type="text"
              className="form-control"
              id="motherToBeName"
              name="motherToBeName"
              value={formData.motherToBeName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="fatherToBeName">Father To Be Name</label>
            <input
              type="text"
              className="form-control"
              id="fatherToBeName"
              name="fatherToBeName"
              value={formData.fatherToBeName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="eventDateTime">Event Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="eventDateTime"
              name="eventDateTime"
              value={formData.eventDateTime}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="eventVenue">Event Venue</label>
            <input
              type="text"
              className="form-control"
              id="eventVenue"
              name="eventVenue"
              value={formData.eventVenue}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="photos">Photos</label>
            <input
              type="file"
              className="form-control"
              id="photos"
              name="photos"
              onChange={handleFileChange}
              multiple
            />
          </div>
        </div>
        <button type="submit" className="btn border">
          Submit
        </button>
      </form>
    </div>

    </>
    )
}export default BabyShower