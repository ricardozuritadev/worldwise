import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { useUrlPosition } from "hooks/useUrlPosition";
import { useCities } from "hooks/useCities";
import { useNavigate } from "react-router-dom";

import { convertToEmoji } from "utils/functions";

import { ButtonType } from "types/button.types";
import { City } from "types/city.types";
import { FORM } from "constants/components/form.constants";
import { GENERAL } from "constants/general.constants";

import DatePicker from "react-datepicker";
import Button from "components/button";
import BackButton from "components/back-button";
import Message from "components/message";
import Spinner from "components/spinner";
import { ROUTES } from "constants/components/routes.constants";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [lat, lng] = useUrlPosition();

  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const { countryName, city, locality, countryCode } = await res.json();

        if (!countryCode) throw new Error(GENERAL.NO_COUNTRY_CLICKED);

        setCountry(countryName || "");
        setCityName(city || locality || "");
        setEmoji(convertToEmoji(countryCode));
      } catch (error: unknown) {
        error instanceof Error && setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: City = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    };
    await createCity(newCity);
    navigate(`/${ROUTES.APP}`);
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng) return <Message message={GENERAL.NO_LAT_LONG} />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">{FORM.CITY_NAME}</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">
          {FORM.WHEN} {cityName}?
        </label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          {FORM.NOTES} {cityName}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={ButtonType.Primary}>{FORM.ADD}</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
