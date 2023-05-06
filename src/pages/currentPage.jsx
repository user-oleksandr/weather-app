import CurrentWeather from "../components/weatherComponents/currentWeather";
import HourlyWeather from "../components/weatherComponents/hourlyWeather";
import ForecastWeather from "../components/weatherComponents/forecastWeekWeather";
import "./currentPage.css";


function CurrentPage({city}) {
    return (
        <div className="currentPage">
            <h2>{city.charAt(0).toUpperCase() + city.slice(1)}</h2>
            {city && <CurrentWeather city={city}/>}
            {city && <HourlyWeather city={city}/>}
            {city && <ForecastWeather city={city}/>}
        </div>
    );
}

export default CurrentPage;
