import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

import AppNav from "components/app-nav";
import Footer from "components/footer";
import Logo from "components/logo";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Sidebar;
