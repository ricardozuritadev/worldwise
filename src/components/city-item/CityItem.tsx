import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

import { City } from "types/city.types";

import { formatDates } from "utils/functions";

type CityProps = {
  city: City;
};

const CityItem = ({
  city: {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng }
  }
}: CityProps) => {
  const queryString: string = `${id}?lat=${lat}&lng=${lng}`;

  return (
    <li>
      <Link to={queryString} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDates(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
