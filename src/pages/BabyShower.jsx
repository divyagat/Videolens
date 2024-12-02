import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< Updated upstream
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../pages/Babyshower.css';
=======
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Babyshower.css";
>>>>>>> Stashed changes

function BabyShower() {
  const [formData, setFormData] = useState({
    name: "",
<<<<<<< Updated upstream
    age: "",
    time: "",
=======
    time: "",
    age: "",
>>>>>>> Stashed changes
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
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

<<<<<<< Updated upstream
=======
  // Video data with prices
>>>>>>> Stashed changes
  const videos = [
    { url: "https://www.youtube.com/embed/VCob9XHw8gQ?si=B3qoMLMh_NTOVEdk", price: 500 },
    { url: "https://www.youtube.com/embed/5AXXrf-a0qI?si=500YJMmw6yz02gR6", price: 800 },
    { url: "https://www.youtube.com/embed/I79wCjSO-wQ?si=ecH502jwx4IcvQLhq4g", price: 1000 },
  ];

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");

  const handlePaymentClick = (price) => {
    setSelectedPrice(price);
    setPaymentUrl(`https://payments.cashfree.com/forms/we1001?amount=${price}`);
    const modal = new bootstrap.Modal(document.getElementById("paymentModal"));
    modal.show();
  };

  return (
    <>
<<<<<<< Updated upstream
      {/* Video Section */}
=======
      {/* Baby Shower Invitation Section */}
>>>>>>> Stashed changes
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
                      onClick={() => handlePaymentClick(video.price)}
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
                      height: "100vh",
                      border: "none",
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

<<<<<<< Updated upstream
      {/* Instructions Section */}
      <div className="container-fluid px-5 my-5 text-white bg-dark py-5">
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-film me-3" style={{ fontSize: '2rem' }}></i>
              <div>
                <h5>Select Video Template</h5>
                <p className="mb-0">Choose a video template from a wide range of designs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-tag me-3" style={{ fontSize: '2rem' }}></i>
              <div>
                <h5>Place Your Order</h5>
                <p className="mb-0">Order the selected video invitation template.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope me-3" style={{ fontSize: '2rem' }}></i>
              <div>
                <h5>Send Your Details</h5>
                <p className="mb-0">Provide event details and photos for customization.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-whatsapp me-3" style={{ fontSize: '2rem' }}></i>
              <div>
                <h5>Get Your Video</h5>
                <p className="mb-0">Receive your video via WhatsApp or Telegram within 24-48 hours.</p>
              </div>
            </div>
          </div>
=======
      {/* Steps Section */}
      <div className="container-fluid px-5 my-5 text-white bg-dark py-5">
        <div className="row">
          {[
            {
              icon: "film",
              title: "Select Video Template",
              description: "Select a video template from a wide range of templates",
            },
            {
              icon: "tag",
              title: "Place Your Order",
              description: "Place an order for the selected video invitation template",
            },
            {
              icon: "envelope",
              title: "Send Your Details",
              description: "Send your required details and photos for the video",
            },
            {
              icon: "whatsapp",
              title: "Get Your Video",
              description:
                "We will edit your video and deliver it via WhatsApp or Telegram within 24 to 48 hours.",
            },
          ].map((step, index) => (
            <div className="col-md-3" key={index}>
              <div className="d-flex align-items-center">
                <i className={`bi bi-${step.icon} me-3`} style={{ fontSize: "2rem" }}></i>
                <div>
                  <h5>{step.title}</h5>
                  <p className="mb-0">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
>>>>>>> Stashed changes
        </div>
      </div>

      {/* Form Section */}
      <div className="container my-5">
<<<<<<< Updated upstream
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
=======
        <h2 className="text-center mb-4">Send Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="row p-5 birth">
            <div className="col-3">
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
            <div className="col-3">
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
            <div className="col-3">
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
            <div className="col-3">
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
            <div className="col-3 mt-4">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
>>>>>>> Stashed changes
      </div>
    </>
  );
}

export default BabyShower;
