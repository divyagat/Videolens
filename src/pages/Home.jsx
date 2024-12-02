import React, { useState } from "react";
import "../pages/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';


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
      image: "src/assets/w2.jpg",
    },
    {
      name: "Shruti Sharma",
      profession: "IT Professional",
      feedback:
        "I had ordered a video invitation for my child's birthday from Video Lens and had a great experience. The video was created beautifully and attractively and I was very happy with it.",
      image: "src/assets/w3.jpg",
    },
    {
      name: "Shruti Sharma",
      profession: "IT Professional",
      feedback:
        "I had ordered a video invitation for my child's birthday from Video Lens and had a great experience. The video was created beautifully and attractively and I was very happy with it.",
      image: "src/assets/w4.jpg",
    },
  ];

  const videos = [
    { url: "https://www.youtube.com/embed/VCob9XHw8gQ", price: 500 },
    { url: "https://www.youtube.com/embed/5AXXrf-a0qI", price: 800 },
    { url: "https://www.youtube.com/embed/I79wCjSO-wQ", price: 1000 },
    { url: "https://www.youtube.com/embed/OetacTm0H0c", price: 700 },
    { url: "https://www.youtube.com/embed/Yhxai8LauDY", price: 1200 },
    { url: "https://www.youtube.com/embed/PXMKVBgL6pI", price: 900 },
    { url: "https://www.youtube.com/embed/Yhxai8LauDY", price: 1100 },
    { url: "https://www.youtube.com/embed/VCob9XHw8gQ", price: 600 },
    { url: "https://www.youtube.com/embed/5AXXrf-a0qI", price: 950 },
    { url: "https://www.youtube.com/embed/I79wCjSO-wQ", price: 750 },
    { url: "https://www.youtube.com/embed/OetacTm0H0c", price: 950 },
    { url: "https://www.youtube.com/embed/Yhxai8LauDY", price: 1300 },
    { url: "https://www.youtube.com/embed/PXMKVBgL6pI", price: 1400 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const openPopup = (url) => {
    const width = window.innerWidth; // Open in full width
    const height = window.innerHeight; // Open in full height
    const left = 0;
    const top = 0;
    window.open(
      url,
      "Cashfree Payment",
      `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes,status=no`
    );
  };

  const handleCashify = (video) => {
    const cashifyUrl = `https://payments.cashfree.com/forms/we1006?amount=${video.price}`;
    openPopup(cashifyUrl);
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
                    <div className="carousel-caption position-absolute w-100 top-50 start-50 translate-middle">
                      <h1 className="fw-bold">Create Your Happy Memories With Us</h1>
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
          <div className="container text-center px-5">
            <p className="text-success">Create your happy moments with us</p>
<<<<<<< HEAD
            <h2 className="mb-5">Discover the most creative videos</h2>
=======
            <h2 className="mb-5 fs-1" style={{fontWeight:"500"}}>Discover the most creative videos</h2>
>>>>>>> 38a5babdfb073f1f4d81f717ba466198f0df47bc
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
                  <div className="card-body mx-auto w-25 my-3">
                    <button
                      className="btn"
                      onClick={() => handleCashify(video)}
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
      {/* start Testimonials Section */}

      <section className="testimonials">
        <p className="text-center hed text-success para">Testimonials</p>
        <h2 className="text-center mb-5">What Our Happy Clients Say</h2>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}  // Show 1 slide by default
          pagination={{
            clickable: true, // Enables pagination
            type: 'bullets', // Ensures dots appear as bullets
            el: '.swiper-pagination', // Defines the element where pagination will show
          }}
          autoplay={{
            delay: 3000, // Automatically move to the next slide every 3 seconds
            disableOnInteraction: false, // Ensure autoplay does not stop after user interaction
          }}
          loop={true} // Enables continuous sliding
          breakpoints={{
            640: { slidesPerView: 1 }, // 1 slide for small screens
            1024: { slidesPerView: 2 }, // 2 slides for larger screens
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card mb-5">
                <p>{testimonial.feedback}</p>
                <div className="client-info mb-3">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.profession}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Add Swiper pagination dots manually if needed */}
          <div className="swiper-pagination"></div>
        </Swiper>

      </section>

      {/* end Testimonials Section */}


    </>
  );
};

export default Home;
