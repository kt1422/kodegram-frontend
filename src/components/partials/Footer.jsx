import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="container my-5">
            <footer className="bg-light text-center text-white">
                <div className="container p-4 pb-0">
                    <section className="mb-4">
                    <Link
                        className="btn btn-primary btn-floating m-1"
                        style={{backgroundColor: "#3b5998"}}
                        role="button"
                        ><i className="fab fa-facebook-f"></i
                    ></Link>
                    <Link
                        className="btn btn-primary btn-floating m-1"
                        style={{backgroundColor: "#55acee"}}
                        role="button"
                        ><i className="fab fa-twitter"></i
                    ></Link>
                    <Link
                        className="btn btn-primary btn-floating m-1"
                        style={{backgroundColor: "#dd4b39"}}
                        role="button"
                        ><i className="fab fa-google"></i
                    ></Link>
                    <Link
                        className="btn btn-primary btn-floating m-1"
                        style={{backgroundColor: "#ac2bac"}}
                        role="button"
                        ><i className="fab fa-instagram"></i
                    ></Link>
                    <Link
                        className="btn btn-primary btn-floating m-1"
                        style={{backgroundColor: "#0082ca"}}
                        role="button"
                        ><i className="fab fa-linkedin-in"></i
                    ></Link>
                    <Link
                        className="btn btn-primary btn-floating m-1"
                        style={{backgroundColor: "#333333"}}
                        role="button"
                        ><i className="fab fa-github"></i
                    ></Link>
                    </section>
                </div>
                <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    © 2020 Copyright:
                    <Link className="text-white">Facetagram.com</Link>
                </div>
            </footer>
        </div>
    )
}

export default Footer;