import styles from "./City.module.css";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "hooks/useCities";

import axios from "axios";

import { formatDates } from "utils/functions";

import { CITY } from "constants/components/city.constants";
import { ROUTES } from "constants/components/routes.constants";
import Spinner from "components/spinner";
import BackButton from "components/back-button";

const BASE_URL = "http://localhost:8000/";
const WIKIPEDIA_URL = "https://en.wikipedia.org/wiki/";

const City = () => {
  const { id } = useParams();
  const { isLoading, setIsLoading, currentCity, setCurrentCity } = useCities();

  const getCity = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_URL}${ROUTES.CITIES}/${id}`);
        setCurrentCity(data);
      } catch (error) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    },
    [setCurrentCity, setIsLoading]
  );

  useEffect(() => {
    if (id) getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>{CITY.NAME}</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>
          {CITY.YOU_WENT} {currentCity?.cityName} {CITY.ON}
        </h6>
        <p>{formatDates(currentCity?.date)}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>{CITY.YOUR_NOTES}</h6>
          <p>{currentCity.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>{CITY.LEARN_MORE}</h6>
        <a
          href={`${WIKIPEDIA_URL}${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          {CITY.CHECK_OUT} {currentCity?.cityName} {CITY.ON_WIKIPEDIA} &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default City;
