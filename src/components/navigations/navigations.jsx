import React, {useState, useEffect} from "react";
import "./navigations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {API_KEY} from '../api/api';
import {NavLink} from "react-router-dom";

function Navigations({onCityChange}) {
    const [city, setCity] = useState("");
    const [isCityEmpty, setIsCityEmpty] = useState(false);

    useEffect(() => {
        const savedCity = localStorage.getItem("city");
        if (savedCity) {
            setCity(savedCity);
            onCityChange(savedCity);
        } else {
            setCity("Kyiv");
            onCityChange("Kyiv");
        }
    }, [onCityChange]);

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const city = data.name;
                            setCity(city);
                            localStorage.setItem("city", city);
                            onCityChange(city);
                        })
                        .catch((error) => console.log(error));
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (city.trim() === "") {
            setIsCityEmpty(true);
        } else {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.cod === "404") {
                        setIsCityEmpty(true);
                        alert(`City is not found. Please check the city you entered`);
                    } else {
                        setIsCityEmpty(false);
                        localStorage.setItem("city", city);
                        onCityChange(city);
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <nav className="navbar navbar-dark fixed-top" style={{backgroundColor: '#2D333B'}}>
            <div className="container-fluid">
                <button className="navbar-toggler end-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbarEnd" aria-controls="offcanvasDarkNavbarEnd"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel2"
                    style={{color: '#006F9E'}}>Weather-app</h5>

                <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbarEnd"
                     aria-labelledby="offcanvasDarkNavbarEndLabel" style={{width: '250px'}}>
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        <h5 className="offcanvas-title" style={{color: '#006F9E'}}>My weather</h5>
                    </div>
                    <div className="offcanvas-body">
                        <div className="row">
                            <div className="col">
                                <div className='col'>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link nav-link-sm text-light"
                                                activeClassName="active"
                                                to="/"
                                            >
                                                Current
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link nav-link-sm text-light"
                                                activeClassName="active"
                                                to="/forecast"
                                            >
                                                Forecast
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link nav-link-sm text-light"
                                                activeClassName="active"
                                                to="/map"
                                            >
                                                Map
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>

                                <div className='col mt-5'>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                placeholder="Enter a city"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                onClick={() => {
                                                    setCity('');
                                                    setIsCityEmpty(false);
                                                }}
                                                className={
                                                    isCityEmpty
                                                        ? 'form-control form-control-sm is-invalid'
                                                        : 'form-control form-control-sm'
                                                }
                                            />
                                            <button className="btn btn-secondary btn-sm" type="submit">
                                                Search
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className='col mt-2'>
                                    <button
                                        className="btn btn-secondary btn-sm w-100"
                                        type="button"
                                        onClick={handleLocation}
                                    >
                                        Location
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>


    );
}

export default Navigations;
