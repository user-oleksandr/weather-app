import L from "leaflet";
import {AiFillEnvironment} from 'react-icons/ai';
import ReactDOMServer from 'react-dom/server';


function MapMarker(position, city) {
    const markerIcon = L.divIcon({
        html: ReactDOMServer.renderToString(<AiFillEnvironment size={25} color="#135697"/>),
        iconSize: [25, 25],
        className: 'custom-marker-icon'
    });
    const marker = L.marker(position, {icon: markerIcon}).bindPopup(city);
    return marker;
}

export default MapMarker;
