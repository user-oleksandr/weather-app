import React from "react";
import {API_KEY} from "../api/api";
import "./navigations.css";

function CityInput({city, setCity, isCityEmpty, setIsCityEmpty, onCityChange,}) {

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
        <div className="box-input">
            <form onSubmit={handleSubmit}>
                <div className='input-button'>
                    <input
                        type="text"
                        placeholder="Enter a city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onClick={() => {
                            setCity("");
                            setIsCityEmpty(false);
                        }}
                        className={isCityEmpty ? "empty" : ""}
                    />
                    <button className="search" type="submit">
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CityInput;
