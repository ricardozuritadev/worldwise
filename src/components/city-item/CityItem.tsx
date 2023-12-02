import styles from "./CityItem.module.css";

import { City } from "../../types/city.types";

import { formatDates } from "../../utils/functions";

type CityProps = {
  city: City;
};

const CityItem = ({ city }: CityProps) => {
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDates(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
};

export default CityItem;
