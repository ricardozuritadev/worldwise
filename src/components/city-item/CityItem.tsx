import styles from "./CityItem.module.css";

import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { City } from "types/city.types";

import { formatDates } from "utils/functions";
import { useCities } from "hooks/useCities";

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
  const { currentCity, deleteCity } = useCities();

  const queryString: string = `${id}?lat=${lat}&lng=${lng}`;

  const cityItemClass = classNames(styles.cityItem, {
    [styles["cityItem--active"]]: id === currentCity?.id
  });

  function handleClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (id) deleteCity(id);
  }

  return (
    <li>
      <Link to={queryString} className={cityItemClass}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDates(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
