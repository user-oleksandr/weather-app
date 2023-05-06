import React, {useState, useEffect} from "react";
import NavLinks from "./navLink";
import CityInput from "./cityInput";
import LocationButton from "./locationButton";
import "./navigations.css";
import {API_KEY} from '../api/api';

function Navigations({onCityChange}) {
    const [city, setCity] = useState("Kyiv");
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

    return (
        <div className="navigations">
            <NavLinks/>
            <CityInput
                city={city}
                setCity={setCity}
                isCityEmpty={isCityEmpty}
                setIsCityEmpty={setIsCityEmpty}
                onCityChange={onCityChange}
            />
            <LocationButton handleLocation={handleLocation}/>
        </div>
    );
}

export default Navigations;
