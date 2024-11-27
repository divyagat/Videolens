import React from "react";
import { Link } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiYoutubeLine } from "react-icons/ri";
import { RiTelegramLine } from "react-icons/ri";
import "../components/SubNavbar.css"

const SubNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-subnav border-bottom">
            <div className="container">
                <div className="collapse navbar-collapse" id="subNavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ">
                            <Link className="nav-link text-light " to="/wedding/themes">
                            <IoIosMail />thevideolens@gmail.com  <FaFacebook className=" ms-5 fs-5"/>&nbsp;&nbsp;&nbsp;&nbsp;<FaInstagram className=" fs-5" />&nbsp;&nbsp;&nbsp;&nbsp;<RiYoutubeLine className=" fs-5" />&nbsp;&nbsp;&nbsp;&nbsp;<RiTelegramLine className="fs-5" />
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SubNavbar;
