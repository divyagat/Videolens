// <<<<<<< Updated upstream
import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiTelegramLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="footer text-white py-5">
      <div className="container">
        <div className="row ms-5 d-flex justify-content-between">
          {/* Logo and Description */}
          <div className="col-lg-3 col-md-6 mb-4 ">
            <img src="src/assets/L3.png" alt="" className="imgl3 mb-3" />
            <p>
              Video Lens empowers creation of premium & modern video invitations
              with professionally designed templates for impactful event promotion.
            </p>

            <div className="social-icons fs-5 fw-bold">
              <i><FaFacebookF /></i>
              <i><FaInstagram /></i>
              <i><AiOutlineYoutube /></i>
              <i><RiTelegramLine /></i>
            </div>
          </div>
          {/* Explore Section */}
          <div className="col-lg-2 col-md-6 mb-4 ps-5 ">
            <h6>Explore</h6>
            <ul className="list-unstyled">
              <li>Wedding</li>
              <li>Birthday</li>
              <li>Baby Shower</li>
            </ul>
          </div>
          {/* Useful Links Section */}
          <div className="col-lg-2 col-md-6 mb-4 ps-5">
            <h6>Useful Links</h6>
            <ul className="list-unstyled">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Refund Policy</li>
            </ul>
          </div>
          {/* Contact Info Section */}
          <div className="col-lg-3 col-md-6 mb-4 ps-5">
            <h6>Contact Info</h6>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-phone-alt"></i> +91 9970753038
              </li>
              <li>
                <i className="fas fa-envelope"></i> thevideolens@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom d-flex justify-content-between align-items-center pt-3">
          <p className="mb-0">&copy; 2023 Video Lens. All Rights Reserved.</p>
          <div className="payment-icons">
            <img src="src/assets/visa.png" alt="Visa" />
            <img src="src/assets/master-cart2.png" alt="Mastercard" />
            <img src="src/assets/americanexpress1.png " alt="American Express" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// =======
// >>>>>>> Stashed changes
