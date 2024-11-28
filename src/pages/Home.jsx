import React, { useState } from "react";
import "../pages/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";

import img1 from "../assets/Screenshot-2024-03-26-130512 (1).png";
import img2 from "../assets/Screenshot-2024-03-26-130611.png";
import img3 from "../assets/Screenshot-2024-03-26-130827.png";
import img4 from "../assets/Screenshot-2024-03-26-131023 (1).png";

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
  const [videoTitle, setVideoTitle] = useState("");

  const handlePaymentClick = (price, title) => {
    setSelectedPrice(price);
    setVideoTitle(title);
    setPaymentUrl(`https://payments.cashfree.com/forms/we1001?amount=${price}`);
    const modal = new window.bootstrap.Modal(document.getElementById("paymentModal"));
    modal.show();
  };

  return (
    <>
      {/* Carousel Section */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                {[img1, img2, img3, img4].map((image, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""} position-relative`}
                    key={index}
                  >
                    <img src={image} className="d-block w-100 zoom-effect" alt={`Slide ${index + 1}`} />
                    <div className="dark-overlay"></div>
                    <div className="carousel-caption position-absolute top-50 start-50 translate-middle">
                      <h3>Create Your Happy Memories With Us</h3>
                      <p>Discover Most Premium & Modern Video Invitations</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* Videos Section */}
      <div className="wedding">
      <section className="py-5">
        <div className="container text-center px-5">
          <h2 className="mb-5">Wedding Invitation Videos</h2>
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





      {/* Testimonials Section */}
      <section className="testimonials">
        <p>Testimonials</p>
        <h2 className="text-center">What Our Happy Clients Say</h2>
        <Swiper spaceBetween={30} slidesPerView={1} navigation pagination={{ clickable: true }}>
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <p>{testimonial.feedback}</p>
                <div className="client-info">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.profession}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Home;
