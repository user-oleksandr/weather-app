import React, {useState, useEffect} from "react";
import axios from "axios";
import {API_KEY} from "../api/api";
import "./forecastWeekWeather.css";
import {FaThermometerHalf} from "react-icons/fa";

function ForecastWeekWeather({city}) {
    const [forecastData, setForecastData] = useState(null);

    // getting the weather forecast
    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
                );
                setForecastData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (city) {
            fetchForecastData();
        }
    }, [city]);

    return (
        <div className="forecast-week">
            <h3 className="box-title">Forecast for week:</h3>
            {forecastData && (
                <div className="weather-card">
                    {forecastData.list.map((forecast, index) => {
                        if (index % 8 === 0) {
                            const date = new Date(forecast.dt_txt);
                            const dayOfMonth = date.toLocaleDateString("en-US", {
                                day: "numeric",
                            });
                            const month = date.toLocaleDateString("en-US", {
                                month: "2-digit",
                            });
                            const year = date.toLocaleDateString("en-US", {
                                year: "numeric",
                            });
                            const temperature = Math.round(forecast.main.temp);
                            const description = forecast.weather[0].description;
                            return (
                                <div key={forecast.dt} className="card-forecast-week">
                                    <h4 className="date">
                                        {dayOfMonth}-{month}-{year}
                                    </h4>
                                    <img
                                        src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                                        alt={description}
                                    />
                                    <p className="temp">
                                        <FaThermometerHalf className="icon"/>{" "}
                                        <span className="tooltip">Temperature</span>
                                        {temperature}°C
                                    </p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );
}

export default ForecastWeekWeather;
