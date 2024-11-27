import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../pages/Home.css"; // Custom CSS styles

const Home = () => {
  const testimonials = [
    {
      name: "Komal Patil",
      profession: "Self Employee",
      feedback:
        "I had ordered a wedding video invitation from Video Lens and was very impressed with their service and video templates. They have a wide variety of templates. I was able to find a template that fit my budget and the quality of the video was excellent.",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Shruti Sharma",
      profession: "IT Professional",
      feedback:
        "I had ordered a video invitation for my child's birthday from Video Lens and had a great experience. The video was created beautifully and attractively and I was very happy with it.",
      image: "https://via.placeholder.com/50",
    },
  ];

  const videos = [
    { url: "https://www.youtube.com/embed/VCob9XHw8gQ", price: 500 },
    { url: "https://www.youtube.com/embed/5AXXrf-a0qI", price: 800 },
    { url: "https://www.youtube.com/embed/I79wCjSO-wQ", price: 1000 },
    { url: "https://www.youtube.com/embed/OetacTm0H0c", price: 700 },
    { url: "https://www.youtube.com/embed/Yhxai8LauDY", price: 1200 },
    { url: "https://www.youtube.com/embed/PXMKVBgL6pI", price: 900 },
  ];

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");

  const handlePaymentClick = (price) => {
    setSelectedPrice(price);
    setPaymentUrl(`https://payments.cashfree.com/forms/we1001?amount=${price}`);
    const modal = new window.bootstrap.Modal(
      document.getElementById("paymentModal")
    );
    modal.show();
  };

  return (
    <>
      <header className="container-fluid bg-dark text-light py-3">
        <h1 className="text-center">Welcome to Video Lens</h1>
      </header>

      {/* Video Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Discover Creative Videos</h2>
          <div className="row">
            {videos.map((video, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="card">
                  <iframe
                    className="card-img-top"
                    src={video.url}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ height: "200px" }}
                  ></iframe>
                  <div className="card-body text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePaymentClick(video.price)}
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

      {/* Testimonials Section */}
      <section className="testimonials py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">What Our Happy Clients Say</h2>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card text-center">
                  <p>{testimonial.feedback}</p>
                  <div className="client-info d-flex align-items-center justify-content-center mt-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div>
                      <h5 className="mb-0">{testimonial.name}</h5>
                      <p className="text-muted mb-0">{testimonial.profession}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Payment Modal */}
      <div
        className="modal fade"
        id="paymentModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Complete Your Payment</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {paymentUrl ? (
                <iframe
                  src={paymentUrl}
                  style={{
                    width: "100%",
                    height: "500px",
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
    </>
  );
};

export default Home;
