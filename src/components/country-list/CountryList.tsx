import styles from "./CountryList.module.css";
import { useCities } from "hooks/useCities";

import { CITY_LIST } from "constants/components/city-list.constants";

import Spinner from "components/spinner";
import Message from "components/message";
import CountryItem from "components/country-item";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message={CITY_LIST.ADD} />;

  const seenCountries = new Set();
  const countries = cities.filter((city) => {
    if (!seenCountries.has(city.country)) {
      seenCountries.add(city.country);
      return true;
    }
    return false;
  });

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
