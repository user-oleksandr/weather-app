import React from "react";
import "./footer.css";

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="contact">
                    <div className="box-contact">
                        <div className="mail">
                            <h3>Contact</h3>
                            <a href="mailto:aavwork@ukr.net" target="_blank" className="test">
                                aavwork@ukr.net
                            </a>
                            <br/>
                            <a href="mailto:name.oleksandr@gmail.com" target="_blank">
                                name.oleksandr@gmail.com
                            </a>
                            <br/>
                            <a href="tg://resolve?domain=username_oleksandr" target="_blank">
                                @username_oleksandr
                            </a>
                        </div>
                        <div className="social">
                            <h3>Social</h3>
                            <a href="https://github.com/user-oleksandr" target="_blank">
                                www.github.com
                            </a>
                            <br/>
                            <a
                                href="https://www.linkedin.com/in/oleksandr-anastasiiev-374925259/"
                                target="_blank"
                            >
                                www.linkedin.com
                            </a>
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="copy">
                    <div>
                        &copy; 2023 Weather App(used git hub colors)
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
