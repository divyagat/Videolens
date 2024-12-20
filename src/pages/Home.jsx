import React, { useState, useEffect } from "react";
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
      name: "Shruti Sharma",
      profession: "IT Professional",
      feedback:
        "I had ordered a video invitation for my child's birthday from Video Lens and had a great experience. The video was created beautifully and attractively and I was very happy with it.",
      image: "src/assets/w2.jpg",
    },
    {
      name: "Pooja Mane",
      profession: "Teacher",
      feedback:
        "Video Lens created a stunning wedding video invitation for me! They have beautiful, high-quality templates at great prices. The process was simple and the team was great with communication. Highly recommend!",
      image: "src/assets/w3.jpg",
    },
    {
      name: "Komal Patil",
      profession: "Self Eployee",
      feedback:
        "I had ordered a wedding video invitation from Video Lens and was very impressed with their service and video templates. They have a wide variety of templates. I was able to find a template that fit my budget and the quality of the video was excellent.",
      image: "src/assets/w4.jpg",
    },
  ];

  const videos = [
    { url: "https://www.youtube.com/embed/5AXXrf-a0qI", price: 1999, paymentGateway: 1001 },
    { url: "https://www.youtube.com/embed/VCob9XHw8gQ", price: 1999, paymentGateway: 1001 },
    { url: "https://www.youtube.com/embed/I79wCjSO-wQ", price: 1999, paymentGateway: 1001 },
    { url: "https://www.youtube.com/embed/OetacTm0H0c", price: 1999, paymentGateway: 1001 },
    { url: "https://www.youtube.com/embed/Yhxai8LauDY", price: 1999, paymentGateway: 1001 },
    { url: "https://www.youtube.com/embed/PXMKVBgL6pI", price: 1499, paymentGateway: 1006 },
    { url: "https://www.youtube.com/embed/Yhxai8LauDY", price: 1999, paymentGateway: 1001 },
    { url: "https://www.youtube.com/embed/VCob9XHw8gQ", price: 1499, paymentGateway: 1006 },
    { url: "https://www.youtube.com/embed/5AXXrf-a0qI", price: 1999, paymentGateway: 1001 },
    { url: "https://www.youtube.com/embed/I79wCjSO-wQ", price: 1499, paymentGateway: 1006 },
    { url: "https://www.youtube.com/embed/OetacTm0H0c", price: 1999, paymentGateway: 1001 },
    { url: "https://www.youtube.com/embed/Yhxai8LauDY", price: 1499, paymentGateway: 1006 },
    { url: "https://www.youtube.com/embed/PXMKVBgL6pI", price: 1999, paymentGateway: 1001 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollButton, setShowScrollButton] = useState(false); // State for showing the scroll-up button
  const videosPerPage = 6;
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Handle scroll event to show/hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) { // Show button after 200px scroll
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const openPopup = (url) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const left = 0;
    const top = 0;
    window.open(
      url,
      "Cashfree Payment",
      `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes,status=no`
    );
  };

  const handlePayment = (video) => {
    const cashfreeUrl = video.paymentGateway === 1001
      ? `https://payments.cashfree.com/forms/we1001?amount=${video.price}`
      : `https://payments.cashfree.com/forms/we1006?amount=${video.price}`;

    openPopup(cashfreeUrl);
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <div className="container-fluid" id="Home">
        <div className="row">
          <div className="col-12">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="4000"
            >
              <div className="carousel-inner">
                {[img1, img2, img3, img4].map((image, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""} position-relative`}
                    key={index}
                  >
                    <img src={image} className="d-block w-100 zoom-effect" alt={`Slide ${index + 1}`} />
                    <div className="dark-overlay"></div>
                    <div className="carousel-caption position-absolute w-100 mt-lg-4 top-50 start-50 translate-middle">
                      <h2>Create Your Happy Memories With Us</h2>
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
      <div className="herovideo">
        <section>
          <div className="container text-center px-lg-5">
            <p className="text-success">Create your happy moments with us</p>
            <h2 className="mb-5">Discover the most creative videos</h2>
            <div className="row g-3">
              {currentVideos.map((video, index) => (
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
                  <div className="card-body mx-auto my-3">
                    <button
                      className="btn"
                      onClick={() => handlePayment(video)}
                    >
                      ₹&nbsp;{video.price}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav aria-label="">
              <ul className="pagination justify-content-end mt-3">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePaginationClick(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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

      {/* Testimonials Section */}
      <section className="testimonials">
        <p className="text-center hed text-success para">Testimonials</p>
        <h2 className="text-center mb-5">What Our Happy Clients Say</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1} // Show 1 slide by default
          pagination={{ clickable: true }} // Enables pagination
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay setup
          loop={true} // Enables continuous sliding
          breakpoints={{
            640: { slidesPerView: 1 }, // 1 slide for small screens (sm)
            1024: { slidesPerView: 2 }, // 2 slides for larger screens (md and above)
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card p-4 mt-4 mb-5">
                <p>{testimonial.feedback}</p>
                <div className="client-info mb-3">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h5>{testimonial.name}</h5>
                    <p>{testimonial.profession}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="btn btn-danger scrollbtn position-fixed bottom-0 end-0 "
          style={{ zIndex: 1000 }}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Home;
