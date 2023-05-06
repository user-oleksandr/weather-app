import React from "react";
import { NavLink } from "react-router-dom";
import "./navigations.css";

function NavLinks() {
    return (
        <nav className="box-nav">
            <ul>
                <li>
                    <NavLink to="/">
                        <button className="nav-button">Current</button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/forecast">
                        <button className="nav-button">Forecast</button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/map">
                        <button className="nav-button">Map</button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavLinks;
