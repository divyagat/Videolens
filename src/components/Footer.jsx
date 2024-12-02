import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiTelegramLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import { LuPhoneCall } from "react-icons/lu";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="footer text-white py-5">
      <div className="container">
        <div className="row ms-5 d-flex justify-content-between">
          {/* Logo and Description */}
          <div className="col-lg-3 col-md-6 mb-4 ">
            <img src="src/assets/L3.png" alt="Video Lens Logo" className="imgl3 mb-3" />
            <p>
              Video Lens empowers creation of premium & modern video invitations
              with professionally designed templates for impactful event promotion.
            </p>

            <div className="social-icons fs-5 fw-bold">
              {/* Social Media Icons */}
              <a href="https://www.facebook.com/thevideolens" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/thevideolens" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@thevideolens" target="_blank" rel="noopener noreferrer">
                <AiOutlineYoutube />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                <RiTelegramLine />
              </a>
            </div>
          </div>
          {/* Explore Section */}
          <div className="col-lg-2 col-md-6 mb-4 ps-5 ">
            <h6>Explore</h6>
            <ul className="list-unstyled">
              <li><a href="/wedding">Wedding</a></li>
              <li><a href="/birthday">Birthday</a></li>
              <li><a href="/babyshower">Baby Shower</a></li>
            </ul>
          </div>
          {/* Useful Links Section */}
          <div className="col-lg-2 col-md-6 mb-4 ps-5">
            <h6>Useful Links</h6>
            <ul className="list-unstyled">
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-conditions">Terms & Conditions</a></li>
              <li><a href="/refund-policy">Refund Policy</a></li>
            </ul>
          </div>
          {/* Contact Info Section */}
          <div className="col-lg-3 col-md-6 mb-4 ps-5">
            <h6>Contact Info</h6>
            <ul className="list-unstyled">
              <li>
                <a href="tel:+919970753038">
                  <i className="fas fa-phone-alt "><LuPhoneCall className="fs-5 text-danger"/>&nbsp;</i>+91 99707530   
                </a>
              </li>
              <li>
                <a href="mailto:thevideolens@gmail.com">
                  <i className="fas fa-envelope"><CiMail className="fs-5 text-danger"/>&nbsp;</i>thevideolens@gmail.com 
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom d-flex justify-content-between align-items-center pt-3">
          <p className="mb-0">&copy; 2023 Video Lens. All Rights Reserved.</p>
          <div className="payment-icons">
            <img src="src/assets/visa.png" alt="Visa" />
            <img src="src/assets/master-cart2.png" alt="Mastercard" />
            <img src="src/assets/americanexpress1.png" alt="American Express" />
            {/* WhatsApp Button */}
            <a
        href="https://wa.me/919970753038"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <BsWhatsapp />
      </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
