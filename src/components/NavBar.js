import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const clearQueryHandler = () => {
    localStorage.clear();
  };

  return (
    <nav className={classes.nav}>
      <ul>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={clearQueryHandler}
          end
        >
          Movies
        </NavLink>
        <NavLink
          to="/tvshows"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={clearQueryHandler}
          end
        >
          TV Shows
        </NavLink>
      </ul>
    </nav>
  );
};
export default NavBar;
