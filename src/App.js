import "./App.css";
import React, {useState} from "react";
import {HashRouter as Router} from "react-router-dom";
import Navigations from "./components/navigations/navigations";
import Footer from "./components/footer/footer";
import RoutesComponent from "./components/routes/routesComponent";

function App() {
    const [city, setCity] = useState("");

    const onCityChange = (city) => {
        setCity(city);
    };

    return (
        <Router>
            <Navigations onCityChange={onCityChange}/>
            <RoutesComponent city={city}/>
            <Footer/>
        </Router>
    );
}

export default App;
