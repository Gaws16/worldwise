import Sidebar from "../Components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../Components/Map";
function AppLayout() {
  return (
    <div className={styles.app}>
      <h1>App Layout</h1>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
