import React, {useState, useEffect} from "react";
import "./hourlyWeather.css";
import axios from "axios";
import {API_KEY} from "../api/api";
import {FaThermometerHalf, FaWind, FaTachometerAlt} from "react-icons/fa";

function HourlyWeather({city}) {
    const [hourlyWeatherData, setHourlyWeatherData] = useState(null);

    // getting hourly weather forecast
    useEffect(() => {
        const fetchHourlyWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
                );
                setHourlyWeatherData(response.data.list);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHourlyWeatherData();
    }, [city]);

    return (
        <>
            {hourlyWeatherData && (
                <div className="hourly-weather">
                    <h3 className="hour-weather-title">The next few hours:</h3>
                    <div className="hourly-weather-details">
                        {hourlyWeatherData.slice(0, 6).map((hourlyData) => (
                            <div key={hourlyData.dt} className="hourly-weather-item">
                                <p className="time">
                                    {new Date(hourlyData.dt * 1000).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                                <img
                                    src={`https://openweathermap.org/img/w/${hourlyData.weather[0].icon}.png`}
                                    alt="Weather Icon"
                                />
                                <p className="temp">
                                    <FaThermometerHalf className="icon"/>{" "}
                                    <span className="tooltip">Temperature</span>
                                    {Math.round(hourlyData.main.temp)}°C
                                </p>
                                <p className="wind">
                                    <FaWind className="icon"/>{" "}
                                    <span className="tooltip">Wind</span>
                                    {hourlyData.wind.deg}° {Math.round(hourlyData.wind.speed)}
                                    m/s
                                </p>
                                <p className="pressure">
                                    <FaTachometerAlt className="icon"/>{" "}
                                    <span className="tooltip">Pressure</span>
                                    {Math.round(hourlyData.main.pressure * 0.75006375541921)}mm
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default HourlyWeather;
