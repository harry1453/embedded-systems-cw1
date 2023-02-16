import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { IoIosTrash } from "react-icons/io";
import "./Map.css";
import { popupHead } from "./popupStyles";
import { useState, useRef } from "react";
import { useMapEvents } from "react-leaflet";
import Routing from "./Routing.js";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

/*  *******************  */
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
/*  *******************  */

function Map(props) {
  const mapRef = useRef(null);
  const tot = props.AllData.reduce(
    ([totalLat, totalLong], { config: { latitude, longitude } }) => {
      return [totalLat + latitude, totalLong + longitude];
    },
    [0, 0]
  );

  const avgLat = tot[0] / props.AllData.length;
  const avgLong = tot[1] / props.AllData.length;

  return (
    <MapContainer ref={mapRef} className="z-30 w-full h-full p-10" center={[avgLat, avgLong]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.AllData.map((popup) => {
        return (
          <Marker position={[popup.config.latitude, popup.config.longitude]} key={popup.id}>
            <Popup>
              <IoIosTrash className="z-30 mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <div className="m-2" style={popupHead}>
                {popup.config.name}
                <br />
                {Math.floor((100 * popup.config.empty_distance_reading) / popup.config.full_distance_reading) +
                  "% Full"}
              </div>
            </Popup>
            {props.SeeRoute && <LocationMarker map={mapRef}/>}
          </Marker>
        );
      })}
      {
        (props.RoutingData.length > 0) &&
          <Routing  RoutingData={props.RoutingData}/>
        }
    </MapContainer>
  );
}

export default Map;
