import React from 'react';
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg bg-white sticky-top border-bottom shadow-sm" data-bs-theme="white">
            <div className="container-lg px-0">
                <Link to={"/home"} className="navbar-brand">
                Facetagram  
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link nav-menu">
                            Home  
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/users"} className="nav-link nav-menu">
                            Users  
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/test1"} className="nav-link nav-menu">
                            SideNav  
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/test2"} className="nav-link nav-menu">
                            Sir divino  
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/test3"} className="nav-link nav-menu">
                            Sir JPL  
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link data-bs-toggle="modal" data-bs-target="#createPostModal" className="nav-link nav-menu">
                            Create 
                            </Link>
                        </li>
                    </ul>
                    <div id="tokenName" className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle nav-menu" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="rounded-circle border border-dark mx-1" src={props.pic} alt="" style={{width: 25, height: 25}}/>
                                &nbsp;Hello, {props.username}&nbsp;
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={`/user/profile?id=${props.user_id}`} className="dropdown-item nav-menu" reloadDocument>Profile</Link>
                                </li>
                                <li>
                                    <Link to={"/user/settings"} className="dropdown-item nav-menu">Settings</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item nav-menu" data-bs-toggle="modal" data-bs-target="#exampleModal4">Log out</Link>
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;