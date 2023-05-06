import React, {useState, useEffect} from "react";
import axios from "axios";
import {API_KEY} from "../api/api";
import "./currentWeather.css";
import {
    FaThermometerHalf,
    FaTachometerAlt,
    FaWind,
    FaEye,
    FaTint,
    FaSun,
    FaRegSun,
    FaSmog,
} from "react-icons/fa";

function CurrentWeather({city}) {
    const [weatherData, setWeatherData] = useState(null); // store weather data
    const [airQuality, setAirQuality] = useState(null); // store air quality data

    // getting weather conditions
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (city) {
            fetchWeatherData();
        }
    }, [city]);

    // obtaining air pollution
    useEffect(() => {
        const fetchAirQualityData = async () => {
            try {
                if (weatherData && weatherData.coord) {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`
                    );
                    setAirQuality(response.data.list[0].main.aqi);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (weatherData) {
            fetchAirQualityData();
        }
    }, [weatherData]);

    return (
        <>
            {weatherData && (
                <div className="current-box">
                    <div className="date">
                        <h3>{new Date().toLocaleDateString()}</h3>
                    </div>
                    <div className="card-weather">
                        <div className="image">
                            <img
                                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                                alt={weatherData.weather[0].description}
                            />
                        </div>
                        <div className="contant">
                            <div className="box-1">
                                <p className="temp">
                                    <FaThermometerHalf className="icon"/>{" "}
                                    <span className="tooltip">Temperature</span>
                                    {`${Math.round(weatherData.main.temp)}°C`}
                                </p>
                                <p className="humid">
                                    <FaTint className="icon"/>{" "}
                                    <span className="tooltip">Humidity</span>
                                    {`${weatherData.main.humidity}%`}
                                </p>
                                <p className="wind">
                                    <FaWind className="icon"/>{" "}
                                    <span className="tooltip">Wind</span>
                                    {`${Math.round(weatherData.wind.speed)}km/h`}
                                </p>
                                <p className="visibility">
                                    <FaEye className="icon"/>{" "}
                                    <span className="tooltip">Visibility</span>
                                    {`${weatherData.visibility / 1000}km`}
                                </p>
                            </div>
                            <div className="box-2">
                                <p className="pressure">
                                    <FaTachometerAlt className="icon"/>{" "}
                                    <span className="tooltip">Pressure</span>
                                    {`${Math.round(weatherData.main.pressure * 0.750062)} mm`}
                                </p>

                                <p className="air">
                                    <FaSmog className="icon"/>{" "}
                                    <span className="tooltip">AirQuality</span>
                                    {airQuality}
                                </p>
                                <p className="sunrise">
                                    <FaRegSun className="icon"/>{" "}
                                    <span className="tooltip">Sunrise</span>
                                    {`${new Date(
                                        weatherData.sys.sunrise * 1000
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}`}
                                </p>
                                <p className="sunset">
                                    <FaSun className="icon"/>{" "}
                                    <span className="tooltip">Sunset</span>
                                    {`${new Date(
                                        weatherData.sys.sunset * 1000
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CurrentWeather;
