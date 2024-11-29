import React from "react";
import { Link } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiYoutubeLine } from "react-icons/ri";
import { RiTelegramLine } from "react-icons/ri";
import "../components/SubNavbar.css";

const SubNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-subnav border-bottom">
            <div className="container">
                <div className="collapse navbar-collapse" id="subNavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/wedding/themes">
                                <IoIosMail /> thevideolens@gmail.com
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ms-5 text-light fs-5"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5 ms-3"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5 ms-3"
                            >
                                <RiYoutubeLine />
                            </a>
                            <a
                                href="https://www.telegram.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5 ms-3"
                            >
                                <RiTelegramLine />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SubNavbar;
