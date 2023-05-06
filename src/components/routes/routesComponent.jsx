import React from "react";
import {Route, Routes} from "react-router-dom";
import CurrentPage from "../../pages/currentPage";
import ForecastPage from "../../pages/forecastPage";
import MapPage from "../../pages/mapPage";

const RoutesComponent = ({city}) => {
    const routes = [
        {
            path: "/",
            element: <CurrentPage city={city}/>,
        },
        {
            path: "/forecast",
            element: <ForecastPage city={city}/>,
        },
        {
            path: "/map",
            element: <MapPage city={city}/>,
        },
    ];

    return (
        <Routes>
            {routes.map(({path, element}, index) => (
                <Route key={index} path={path} element={element}/>
            ))}
        </Routes>
    );
};

export default RoutesComponent;
