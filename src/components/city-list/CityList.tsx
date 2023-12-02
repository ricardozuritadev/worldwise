import styles from "./CityList.module.css";
import { City } from "../../types/city.types";

import Spinner from "../spinner";
import CityItem from "../city-item/CityItem";
import Message from "../message";

type CityListProps = {
  isLoading: boolean;
  cities: City[];
};

const CityList = ({ isLoading, cities }: CityListProps) => {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
