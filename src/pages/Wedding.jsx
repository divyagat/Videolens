import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./wedding.css"; // Include this if you are adding custom styles

function WeddingForm() {
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

      const response = await fetch("http://localhost:5000/api/wedding", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Wedding details submitted successfully!");
      } else {
        alert("Error submitting form.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form.");
    }
  };

  const videos = [
    { id: 1, url: "https://www.youtube.com/embed/VCob9XHw8gQ?si=B3qoMLMh_NTOVEdk", price: 500 },
    { id: 2, url: "https://www.youtube.com/embed/5AXXrf-a0qI?si=500YJMmw6yz02gR6", price: 800 },
    { id: 3, url: "https://www.youtube.com/embed/I79wCjSO-wQ?si=ecH502jwx4IcvQLhq4g", price: 1000 },
    { id: 4, url: "https://www.youtube.com/embed/OetacTm0H0c?si=bcx1DKBtkgN9iDo1", price: 700 },
    { id: 5, url: "https://www.youtube.com/embed/Yhxai8LauDY?si=cbvPdozKNXMgI9G7", price: 1200 },
    { id: 6, url: "https://www.youtube.com/embed/PXMKVBgL6pI?si=orye25mMjMS8j1c_", price: 900 },
    { id: 7, url: "https://www.youtube.com/embed/-lD0AH5Kx3U?si=Wld4fenOOQVSv6FV", price: 600 },
    { id: 8, url: "https://www.youtube.com/embed/jPmVpEOOvUs?si=ydUQq0W-mhG_dN3J", price: 750 },
    { id: 9, url: "https://www.youtube.com/embed/L4omEdmCjjU?si=0ZSqcnqBxZPmP0US", price: 850 },
    { id: 1, url: "https://www.youtube.com/embed/VCob9XHw8gQ?si=B3qoMLMh_NTOVEdk", price: 500 },
    { id: 2, url: "https://www.youtube.com/embed/5AXXrf-a0qI?si=500YJMmw6yz02gR6", price: 800 },
    { id: 3, url: "https://www.youtube.com/embed/I79wCjSO-wQ?si=ecH502jwx4IcvQLhq4g", price: 1000 },
    { id: 4, url: "https://www.youtube.com/embed/OetacTm0H0c?si=bcx1DKBtkgN9iDo1", price: 700 },
    { id: 5, url: "https://www.youtube.com/embed/Yhxai8LauDY?si=cbvPdozKNXMgI9G7", price: 1200 },
    { id: 6, url: "https://www.youtube.com/embed/PXMKVBgL6pI?si=orye25mMjMS8j1c_", price: 900 },
    { id: 7, url: "https://www.youtube.com/embed/-lD0AH5Kx3U?si=Wld4fenOOQVSv6FV", price: 600 },
    { id: 8, url: "https://www.youtube.com/embed/jPmVpEOOvUs?si=ydUQq0W-mhG_dN3J", price: 750 },
    { id: 9, url: "https://www.youtube.com/embed/L4omEdmCjjU?si=0ZSqcnqBxZPmP0US", price: 850 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9;
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openPopup = (url, width = 600, height = 700) => {
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    window.open(
      url,
      "Cashify Payment",
      `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes,status=no`
    );
  };

  const handleCashify = (video) => {
    const cashifyUrl = `https://payments.cashfree.com/forms/we1001?amount=${video.price}`;
    openPopup(cashifyUrl);
  };

  return (
    <>
      <div className="wedding">
        {/* Videos Section */}
        <section className="py-5 px-5">
          <div className="container text-center px-5">
            <h2 className="mb-5">Wedding Invitation Videos</h2>
            <div className="row g-5">
              {currentVideos.map((video) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={video.id}>
                  <div className="card">
                    <iframe
                      src={video.url}
                      title={`Video ${video.id}`}
                      className="card-img-top"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: "100%", height: "200px", borderRadius: "10px" }}
                    ></iframe>
                  </div>
                  <div className="card-body mx-auto my-3">
                    <button className="btn" onClick={() => handleCashify(video)}>
                      ₹ &nbsp;{video.price}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-center my-4">
            <nav>
              <ul className="pagination">
                {Array.from({ length: Math.ceil(videos.length / videosPerPage) }, (_, i) => (
                  <li className={`page-item ${currentPage === i + 1 ? "active" : ""}`} key={i}>
                    <button className="page-link" onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </div>


      <div className="container-fluid px-5 my-5 text-white bg-dark py-5">
        <div className="row mx-5 g-5">
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-film me-3 mb-5" style={{ fontSize: '2rem' }}></i>
              <div>
                <h5>Select Video Template</h5>
                <p className="mb-0">Select a video template from a wide range of templates</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-tag me-3 mb-5" style={{ fontSize: '2rem' }}></i>
              <div>
                <h5>Place Your Order</h5>
                <p className="mb-0">Place an order for the selected video invitation template</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope me-3 mb-5" style={{ fontSize: '2rem' }}></i>
              <div>
                <h5>Send Your Details</h5>
                <p className="mb-0">Send your required details and photos for the video</p>
              </div>
            </div>
          </div>

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



   

    

      <div className="container my-5">
        <h2 className="text-center py-3">Send Wedding Details</h2>
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
          </div>

          <div className="row">
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
          </div>

          <div className="mb-3">
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

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="haldiCeremony">Haldi Ceremony</label>
              <input
                type="date"
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
                type="date"
                className="form-control"
                id="engagement"
                name="engagement"
                value={formData.engagement}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="reception">Reception</label>
              <input
                type="date"
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
          </div>

          <div className="mb-3">
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

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="bridePhotos">Bride's Photos</label>
              <input
                type="file"
                className="form-control"
                id="bridePhotos"
                name="bridePhotos"
                onChange={handleFileChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="groomPhotos">Groom's Photos</label>
              <input
                type="file"
                className="form-control"
                id="groomPhotos"
                name="groomPhotos"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-danger">
              Submit Details
            </button>
          </div>
        </form>
      </div>
 
    </>
  );
}

export default WeddingForm;
