import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiYoutubeLine } from "react-icons/ri";
import { RiTelegramLine } from "react-icons/ri";
import "../components/SubNavbar.css";

const SubNavbar = () => {
    const [isEmailClicked, setEmailClicked] = useState(false);

    const handleEmailClick = () => {
        setEmailClicked(true);
        setTimeout(() => setEmailClicked(false), 2000); // Reset underline after 2 seconds
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-subnav border-bottom">
            <div className="container">
                <div className="collapse navbar-collapse" id="subNavbar">
                    <ul className="navbar-nav ms-auto">
                        {/* Email link */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link text-light ${isEmailClicked ? "underline" : ""}`}
                                to="/wedding/themes"
                                onClick={handleEmailClick}
                            >
                                <IoIosMail /> thevideolens@gmail.com
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            {/* Social media links */}
                            <Link
                                to="/facebook"
                                target="_blank"
                                className="ms-5 text-light fs-5 social-link"
                            >
                                <FaFacebook />
                            </Link>
                            <Link
                                to="/instagram"
                                target="_blank"
                                className="text-light fs-5 ms-3 social-link"
                            >
                                <FaInstagram />
                            </Link>
                            <Link
                                to="/youtube"
                                target="_blank"
                                className="text-light fs-5 ms-3 social-link"
                            >
                                <RiYoutubeLine />
                            </Link>
                            <Link
                                to="/telegram"
                                target="_blank"
                                className="text-light fs-5 ms-3 social-link"
                            >
                                <RiTelegramLine />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SubNavbar;
