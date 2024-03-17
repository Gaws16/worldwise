import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from 
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
    </div>
  );
}

export default Sidebar;
