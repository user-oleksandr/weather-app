import Map from "../components/map/map";
import "./mapPage.css";

function MapPage({city}) {
    return (
        <div className="mapPage">
            <h2>{city.charAt(0).toUpperCase() + city.slice(1)}</h2>
            <div>{city && <Map city={city} key={city}/>}</div>
        </div>
    );
}

export default MapPage;
