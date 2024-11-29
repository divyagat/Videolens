import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../pages/Babyshower.css'
function BabyShower() {

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
  return (
    <>
      {/* start wedding */}
      <div className="wedding">
        <section className="py-5">
          <div className="container text-center px-5">
            <h2 className="mb-5">Baby Shower Invitation Video</h2>
            <div className="row g-3">
              {videos.map((video, index) => (
                <div className="col-lg-4 px-4 col-md-6 col-sm-12 mb-4" key={index}>
                  <div className="card">
                    <iframe
                      src={video.url}
                      title={`Video ${index + 1}`}
                      className="card-img-top"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: "100%", height: "200px", borderRadius: "10px" }}
                    ></iframe>

                  </div>
                  <div className="card-body my-3">
                    <button
                      className="btn"
                      onClick={() => handlePaymentClick(video.price, `Video ${index + 1}`)}
                    >
                      ₹&nbsp;{video.price}
                    </button>
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

{/* <<<<<<< HEAD */}
    

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
{/* ======= */}
      <div className="container-fluid px-5 my-5 text-white bg-dark py-5">
{/* >>>>>>> cbfca6b07684752eca4d22fc5146af74fcbcaf35 */}
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


       {/* (Birthday Form) */}
       <div className="container my-5">
                <div className="row p-5 birth">
                    <div className="col-12 text-center pb-5">
                        <h2>Send Details</h2>
                    </div>
                    <div className="col-3">
                        <label>Birthday Person Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        <label className="mt-4">Event Time</label>
                        <input type="text" name="time" value={formData.time} onChange={handleChange} />
                    </div>
                    <div className="col-3">
                        <label>Birthday Age</label>
                        <input type="text" name="age" value={formData.age} onChange={handleChange} />
                        <label className="mt-4">Event Venue</label>
                        <input type="text" name="venue" value={formData.venue} onChange={handleChange} />
                    </div>
                    <div className="col-3">
                        <label>Event Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} /><br />
                        <label className="mt-4">Message</label>
                        <input type="text" name="message" value={formData.message} onChange={handleChange} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="photos" className="form-label">Photos</label>
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
                    <div className="col-3 mt-4">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>

    </>
  )
}
 export default BabyShower;