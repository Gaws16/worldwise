import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation,js";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const [position, setPosition] = useState([0, 0]);
  const { cities } = useCities();
  const {
    isLoading: positionLoading,
    getPosition,
    position: geoLocationPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();
  useEffect(() => {
    if (lat && lng) {
      setPosition([parseFloat(lat), parseFloat(lng)]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoLocationPosition) {
      setPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {positionLoading ? "Loading..." : "Get current position"}
        </Button>
      )}

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((c) => (
          <Marker position={[c.position.lat, c.position.lng]} key={c.id}>
            <Popup>
              <span>{c.emoji}</span>
              <span>{c.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <CenterPosition position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function CenterPosition({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  const map = useMap();
  useEffect(() => {
    map.on("click", (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    });
    return () => {
      map.off("click");
    };
  }, [navigate, map]);

  return null;
}
export default Map;
