import React from "react";
import "./forecastButtons.css";

function ForecastButtons({handleButtonClick, buttonIndex}) {
    return (
        <div className="forecast-buttons">
            <button
                onClick={() => handleButtonClick(0)}
                className={buttonIndex === 0 ? "active" : ""}
            >
                {new Date(
                    new Date().getTime() + 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
            </button>
            <button
                onClick={() => handleButtonClick(1)}
                className={buttonIndex === 1 ? "active" : ""}
            >
                {new Date(
                    new Date().getTime() + 2 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
            </button>
            <button
                onClick={() => handleButtonClick(2)}
                className={buttonIndex === 2 ? "active" : ""}
            >
                {new Date(
                    new Date().getTime() + 3 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
            </button>
            <button
                onClick={() => handleButtonClick(3)}
                className={buttonIndex === 3 ? "active" : ""}
            >
                {new Date(
                    new Date().getTime() + 4 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
            </button>
            <button
                onClick={() => handleButtonClick(4)}
                className={buttonIndex === 4 ? "active" : ""}
            >
                {new Date(
                    new Date().getTime() + 5 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
            </button>
        </div>
    );
}

export default ForecastButtons;
