import React, {useState, useEffect} from "react";
import ForecastButtons from "../components/buttons/forecastButtons";
import HourlyWeather from "../components/weatherComponents/forecastHourlyWeather";
import {API_KEY} from "../components/api/api";
import axios from "axios";
import "./forecastPage.css";

function ForecastPage({city}) {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastList, setForecastList] = useState([]);
    const [buttonIndex, setButtonIndex] = useState(0);

    // getting weather data for 5 days
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error("Помилка отримання даних про погоду:", error);
            }
        };
        // clear the weather forecast list and query the server after entering the city
        setForecastList([]);
        if (city !== "") {
            fetchWeatherData();
        }
    }, [city]);
    // state change weatherData
    useEffect(() => {
        if (weatherData) {
            handleButtonClick(buttonIndex);
        }
    }, [weatherData]);
    // process the button click, set the index and display the forecast list for the selected date
    const handleButtonClick = (index) => {
        // set state value
        setButtonIndex(index);
        // create date object + index
        const date = new Date();
        date.setDate(date.getDate() + index + 1);
        // conversion to page
        const dateString = date.toLocaleDateString();
        // filter the weather list by date
        const filteredList = weatherData.list.filter((forecast) => {
            return new Date(forecast.dt * 1000).toLocaleDateString() === dateString;
        });
        // filtered list of weather forecast
        setForecastList(filteredList);
    };

    return (
        <div className="forecastPage">
            <h2>{city.charAt(0).toUpperCase() + city.slice(1)}</h2>
            {weatherData && (
                <div>
                    <ForecastButtons
                        handleButtonClick={handleButtonClick}
                        buttonIndex={buttonIndex}
                    />
                    <HourlyWeather forecastList={forecastList}/>
                </div>
            )}
        </div>
    );
}

export default ForecastPage;
