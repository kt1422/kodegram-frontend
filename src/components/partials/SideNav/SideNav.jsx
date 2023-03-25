import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faHeart, faMoon, faSun, faSearch, faPlusSquare, faUserCircle, faMessage, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ModalSearch from "../ModalSearch";
import ModalLogout from "../ModalLogout";

const SideNav = (props) => {
    
    const [searchValue, setSearchValue] = useState("");
    // const [isDarkMode, setIsDarkMode] = useState(false);
    const isDarkMode = props.isDarkMode;
    const handleThemeToggle = () => {
        const cookies = new Cookies();
        cookies.set('theme', !isDarkMode, { path: '/' });
        props.setIsDarkMode(!isDarkMode);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div>
            <ModalLogout></ModalLogout>
            <ModalSearch likeModal={props.likeModal} setLikeModal={props.setLikeModal}></ModalSearch>
            <div className={`sidenav border-end ${isDarkMode ? "dark" : ""}`}>
                <div className="sidenav-header">
                    <Link to={"/home"} className="d-flex nav-link">
                        <img className="logo my-1" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png" alt="Instagram" />
                        <span className="kode fs-4 fw-semibold">Kodegram</span>
                    </Link>
                </div>
                <nav>
                    <ul className="nav-list ps-0">
                        <li className="nav-item">
                        <Link to={"/home"} className={`nav-link light a ${isDarkMode ? "dark" : ""}`}>
                            <FontAwesomeIcon icon={faHome} className="nav-icon" /><span className="nav-label">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                            <FontAwesomeIcon icon={faCompass} className="nav-icon" />
                            <span className="nav-label">Explore</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/chat/login"} className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                            <FontAwesomeIcon icon={faMessage} className="nav-icon" />
                            <span className="nav-label">Messages</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                            <FontAwesomeIcon icon={faHeart} className="nav-icon" />
                            <span className="nav-label">Notifications</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link data-bs-toggle="modal" data-bs-target="#createPostModal" className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                            <FontAwesomeIcon icon={faPlusSquare} className="nav-icon" />
                            <span className="nav-label">Create</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/user/profile?id=${props.user_id}`} className={`nav-link light ${isDarkMode ? "dark" : ""}`} reloadDocument>
                            <FontAwesomeIcon icon={faUserCircle} className="nav-icon" />
                            <span className="nav-label">Profile</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/"} className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                            <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" />
                            <span className="nav-label">About Us</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link data-bs-toggle="modal" data-bs-target="#modalSearch" className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                            <FontAwesomeIcon icon={faSearch} className="nav-icon" />
                            <span className="nav-label">Search</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link light ${isDarkMode ? "dark" : ""}`} onClick={handleThemeToggle}>
                            <FontAwesomeIcon
                            icon={isDarkMode ? faSun : faMoon}
                            className={`nav-icon ${isDarkMode ? "dark" : ""}`}
                            />
                            <span className={`nav-label ${isDarkMode ? "dark" : ""}`}>
                                {isDarkMode ? "Light Mode" : "Dark Mode"}
                            </span>
                            </Link>
                        </li>
                        <li className="nav-item dropdown dropup">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="rounded-circle border border-dark me-2" src={props.pic} alt="" style={{width: 25, height: 25}}/>
                                <span className={`nav-label ${isDarkMode ? "dark" : ""}`}>
                                {props.username}
                                </span>
                            </a>
                            <ul className={`dropdown-menu ${isDarkMode ? "dark" : ""}`} style={{position: "absolute"}}>
                                <li>
                                    <Link to={`/user/profile?id=${props.user_id}`} className={`dropdown-item ${isDarkMode ? "dark" : ""}`} reloadDocument>Profile</Link>
                                </li>
                                <li>
                                    <Link to={"/user/settings"} className={`dropdown-item ${isDarkMode ? "dark" : ""}`}>Settings</Link>
                                </li>
                                <li>
                                    <Link className={`dropdown-item ${isDarkMode ? "dark" : ""}`} data-bs-toggle="modal" data-bs-target="#exampleModal4">Log out</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default SideNav;