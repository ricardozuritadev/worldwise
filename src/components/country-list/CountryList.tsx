import styles from "./CountryList.module.css";

import { City } from "../../types/city.types";

import Spinner from "../spinner";
import Message from "../message";
import CountryItem from "../country-item";

type CountryListProps = {
  isLoading: boolean;
  cities: City[];
};

const CountryList = ({ isLoading, cities }: CountryListProps) => {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

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
