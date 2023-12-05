import styles from "./PageNav.module.css";

import { NavLink } from "react-router-dom";

import { APP_NAV } from "constants/components/app-nav.constants";
import { ROUTES } from "constants/components/routes.constants";

import Logo from "components/logo";

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to={`/${ROUTES.PRICING}`}>{APP_NAV.PRICING}</NavLink>
        </li>
        <li>
          <NavLink to={`/${ROUTES.PRODUCT}`}>{APP_NAV.PRODUCT}</NavLink>
        </li>
        <li>
          <NavLink to={`/${ROUTES.LOGIN}`} className={styles.ctaLink}>
            {APP_NAV.LOGIN}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
