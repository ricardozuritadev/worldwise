import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

import AppNav from "../app-nav";
import Footer from "../footer";
import Logo from "../logo";

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
