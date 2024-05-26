import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [serachParams, setSearchParams] = useSearchParams();
  const { lat, lng } = Object.fromEntries(serachParams);
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h4>
        Position: {lat} {lng}
      </h4>
      <button onClick={() => setSearchParams({ lat: 40.7128, lng: -74.006 })}>
        Set Params
      </button>
    </div>
  );
}

export default Map;
