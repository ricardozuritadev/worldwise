import styles from "./AppLayout.module.css";

import Sidebar from "../../components/sidebar/Sidebar";
import Map from "../../components/map";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
