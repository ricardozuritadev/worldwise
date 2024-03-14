import styles from './Form.module.css';

import { useEffect, useState } from 'react';
import { useUrlPosition } from 'hooks/useUrlPosition';

import { convertToEmoji } from 'utils/functions';

import { ButtonType } from 'types/button.types';
import { FORM } from 'constants/components/form.constants';
import { GENERAL } from 'constants/general.constants';

import Button from 'components/button';
import BackButton from 'components/back-button';
import Message from 'components/message';
import Spinner from 'components/spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [geocodingError, setGeocodingError] = useState('');
  const [lat, long] = useUrlPosition();

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError('');
        const res = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${long}`
        );
        const { countryName, city, locality, countryCode } = await res.json();

        if (!countryCode) throw new Error(GENERAL.NO_COUNTRY_CLICKED);

        setCountry(countryName || '');
        setCityName(city || locality || '');
        setEmoji(convertToEmoji(countryCode));
      } catch (error: unknown) {
        error instanceof Error && setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, long]);

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toString()}
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
        <Button onClick={() => console.log('click')} type={ButtonType.Primary}>
          {FORM.ADD}
        </Button>

        <BackButton />
      </div>
    </form>
  );
}

export default Form;
