import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

import { ROUTES } from "constants/components/routes.constants";
import { APP_NAV } from "constants/components/app-nav.constants";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={ROUTES.CITIES}>{APP_NAV.CITIES}</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.COUNTRIES}>{APP_NAV.COUNTRIES}</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
