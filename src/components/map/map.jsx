import React, {useRef, useEffect} from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.fullscreen";
import {API_KEY} from "../api/api";
import "./map.css";
import MapMarker from "./mapMarker";
import WeatherPopup from "./weatherPopup";
import "leaflet.fullscreen";
import {AiOutlineFullscreen} from "react-icons/ai";
import ReactDOMServer from "react-dom/server";

function Map({city}) {
    const mapRef = useRef(null);
    let map = null; // Declare map variable outside the useEffect hook

    useEffect(() => {
        // Geocode of the city to get its coordinates
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;
        fetch(geocodeUrl)
            .then((response) => response.json())
            .then((data) => {
                const {lat, lon} = data[0];

                // Destroy existing map instance if it exists
                if (map) {
                    map.remove();
                }

                // Creating a map instance and setting city coordinates
                map = L.map(mapRef.current).setView([lat, lon], 7);
                // Add a tile layer (OpenStreetMap)
                L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
                    attribution:
                        'Map data © <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors',
                    maxZoom: 17,
                }).addTo(map);

                // Add a marker with the city name as a popup
                const marker = MapMarker([lat, lon], city);
                marker.addTo(map);

                // Get weather data for the selected location
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
                fetch(weatherUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const popupContent = WeatherPopup(data, city);
                        // create weather forecast popup
                        marker.bindPopup(popupContent).openPopup();
                    })
                    .catch((error) => console.log(error));

                // Disable the default zoom control
                map.zoomControl.remove();

                // Add a new zoom control to the bottom-right corner with custom icons
                L.control.zoom({
                    position: 'topright',
                    zoomInTitle: 'Zoom in',
                    zoomOutTitle: 'Zoom out',
                    zoomInIcon: '<i class="fas fa-plus"></i>',
                    zoomOutIcon: '<i class="fas fa-minus"></i>'
                }).addTo(map);


                // Add fullscreen control with icon
                const fullscreenControl = L.control.fullscreen({
                    position: "topright",
                    title: "Fullscreen",
                    titleCancel: "Exit fullscreen",
                    content: ReactDOMServer.renderToString(
                        <AiOutlineFullscreen style={{height: "30px", width: "30px"}}/>
                    ),
                    forceSeparateButton: true,
                });
                fullscreenControl.addTo(map);

            }).catch((error) => console.log(error));

        // Cleanup function to remove map instance
        return () => {
            if (map) {
                map.remove();
            }
        }
    }, [city]);

    return <div className="map" ref={mapRef}/>;
}

export default Map;
