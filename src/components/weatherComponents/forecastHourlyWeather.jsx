import React from "react";
import "./forecastHourlyWeather.css";
import {
    FaThermometerHalf,
    FaWind,
    FaEye,
    FaTint,
    FaTachometerAlt,
    FaCloudRain,
    FaCloud,
} from "react-icons/fa";

function ForecastHourlyWeather({forecastList}) {
    return (
        <div className="block-1">
            {forecastList.map((forecast) => (
                <div key={forecast.dt} className="block-2">
                    <p className="time">
                        {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                            hour12: false,
                        })}
                    </p>
                    <img
                        className="image"
                        src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                        alt="Weather Icon"
                    />
                    <p className="wind">
                        <FaWind className="icon"/> <span className="tooltip">Wind</span>
                        {Math.round(forecast.wind.deg)}° {Math.round(forecast.wind.speed)}
                        м/с,
                    </p>
                    <p className="visibility">
                        <FaEye className="icon"/>{" "}
                        <span className="tooltip">Visibility</span>
                        {Math.round(forecast.visibility / 1000)} km
                    </p>
                    <p className="temp">
                        <FaThermometerHalf className="icon"/>{" "}
                        <span className="tooltip">Temperature</span>
                        {Math.round(forecast.main.temp - 273.15)}
                        &#8451;
                    </p>
                    <p className="humid">
                        <FaTint className="icon"/>{" "}
                        <span className="tooltip">Humidity</span>
                        {forecast.main.humidity}%
                    </p>
                    <p className="clouds">
                        <FaCloud className="icon"/> <span className="tooltip">Clouds</span>
                        {forecast.clouds.all}%
                    </p>
                    <p className="rain">
                        <FaCloudRain className="icon"/>{" "}
                        <span className="tooltip">Rain</span>
                        {Math.round(forecast.pop)}%
                    </p>
                    <p className="pressure">
                        <FaTachometerAlt className="icon"/>{" "}
                        <span className="tooltip">Pressure</span>
                        {Math.round(forecast.main.pressure * 0.75006)}mm
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ForecastHourlyWeather;
