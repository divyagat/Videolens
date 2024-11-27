import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Wedding() {
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
  );
}

export default Wedding;
