import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form, Button } from 'react-bootstrap';
function Wedding() {

  const [formData, setFormData] = useState({
    brideName: "",
    brideParentsName: "",
    groomName: "",
    groomParentsName: "",
    address: "",
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
    { url: "https://www.youtube.com/embed/OetacTm0H0c?si=bcx1DKBtkgN9iDo1", price: 700 },
    { url: "https://www.youtube.com/embed/Yhxai8LauDY?si=cbvPdozKNXMgI9G7", price: 1200 },
    { url: "https://www.youtube.com/embed/PXMKVBgL6pI?si=orye25mMjMS8j1c_", price: 900 },
    { url: "https://www.youtube.com/embed/-lD0AH5Kx3U?si=Wld4fenOOQVSv6FV", price: 600 },
    { url: "https://www.youtube.com/embed/jPmVpEOOvUs?si=ydUQq0W-mhG_dN3J", price: 750 },
    { url: "https://www.youtube.com/embed/L4omEdmCjjU?si=0ZSqcnqBxZPmP0US", price: 850 },
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

  return (
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
            <i className="bi bi-film me-3 mb-4" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5>Select Video Template</h5>
              <p className="mb-0">Select a video template from a wide range of templates</p>
            </div>
          </div>
        </div>

        {/* Step 2: Place Your Order */}
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-tag me-3 mb-4" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5>Place Your Order</h5>
              <p className="mb-0">Place an order for the selected video invitation template</p>
            </div>
          </div>
        </div>

        {/* Step 3: Send Your Details */}
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-envelope me-3 mb-4" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5>Send Your Details</h5>
              <p className="mb-0">Send your required details and photos for the video</p>
            </div>
          </div>
        </div>

        {/* Step 4: Get Your Video */}
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-whatsapp me-3 mb-5" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5>Get Your Video</h5>
              <p className="mb-0">We will edit your video and deliver it via WhatsApp or Telegram within 24 to 48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="container mt-5">
      <h2 className="text-center">Send Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
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
          <div className="col-md-6 mb-3">
            <label htmlFor="brideParentsName">Bride Parents Name</label>
            <input
              type="text"
              className="form-control"
              id="brideParentsName"
              name="brideParentsName"
              value={formData.brideParentsName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
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
          <div className="col-md-6 mb-3">
            <label htmlFor="groomParentsName">Groom Parents Name</label>
            <input
              type="text"
              className="form-control"
              id="groomParentsName"
              name="groomParentsName"
              value={formData.groomParentsName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
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
          <div className="col-md-6 mb-3">
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
          <div className="col-md-6 mb-3">
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
            <label htmlFor="venue">Venue / Location</label>
            <input
              type="text"
              className="form-control"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="bridePhotos">Bride Photos</label>
            <input
              type="file"
              className="form-control"
              id="bridePhotos"
              name="bridePhotos"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="groomPhotos">Groom Photos</label>
            <input
              type="file"
              className="form-control"
              id="groomPhotos"
              name="groomPhotos"
              onChange={handleFileChange}
              multiple
            />
          </div>
        </div>
        <button type="submit" className="btn border">Submit</button>
      </form>
    </div>
</>  
  );
}

export default Wedding;
