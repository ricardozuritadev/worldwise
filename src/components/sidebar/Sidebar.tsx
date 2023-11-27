import styles from "./Sidebar.module.css";

import AppNav from "../app-nav/AppNav";
import Footer from "../footer/Footer";
import Logo from "../logo/Logo";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <Footer />
    </div>
  );
};

export default Sidebar;
