import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

import { GENERAL } from "constants/general.constants";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>{GENERAL.MAP}</h1>
      <h2>
        {GENERAL.POSITION}: {lat}, {lng}
      </h2>

      <button
        onClick={() =>
          setSearchParams({
            lat: "23",
            lng: "50"
          })
        }
      >
        Change position
      </button>
    </div>
  );
};

export default Map;
