import styles from "./City.module.css";
// import { useParams, useSearchParams } from "react-router-dom";

import { CITY } from "constants/components/city.constants";

const WIKIPEDIA_URL = "https://en.wikipedia.org/wiki/";

const formatDate = (date: string): string | null =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
  }).format(new Date(date));

const City = () => {
  // const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();

  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!"
  };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>{CITY.NAME}</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>
          {CITY.YOU_WENT} {cityName} {CITY.ON}
        </h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>{CITY.YOUR_NOTES}</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>{CITY.LEARN_MORE}</h6>
        <a
          href={`${WIKIPEDIA_URL}${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          {CITY.CHECK_OUT} {cityName} {CITY.ON_WIKIPEDIA} &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
};

export default City;
