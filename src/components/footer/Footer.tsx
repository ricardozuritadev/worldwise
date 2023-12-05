import styles from "./Footer.module.css";

import { GENERAL } from "constants/general.constants";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {GENERAL.COPYRIGHT} {new Date().getFullYear()}{" "}
        {GENERAL.WORDLWISE}
      </p>
    </footer>
  );
};

export default Footer;
