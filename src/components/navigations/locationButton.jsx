import React from "react";
import {NavLink} from "react-router-dom";
import "./navigations.css";

function LocationButton({handleLocation}) {
    return (
        <div className="box-location">
            <NavLink to="/">
                <button className="location"  type="button" onClick={handleLocation}>
                    Location
                </button>
            </NavLink>

        </div>
    );
}

export default LocationButton;
