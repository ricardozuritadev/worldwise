import styles from "./CityList.module.css";
import { useCities } from "hooks/useCities";

import { CITY_LIST } from "constants/components/city-list.constants";

import Spinner from "components/spinner";
import CityItem from "components/city-item";
import Message from "components/message";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message={CITY_LIST.ADD} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
