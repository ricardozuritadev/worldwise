import styles from "./CountryItem.module.css";

type CountryItemProps = {
  country: {
    emoji: string;
    country: string;
  };
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
