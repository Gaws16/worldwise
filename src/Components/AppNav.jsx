import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/">Home</NavLink>
    </nav>
  );
}

export default AppNav;
