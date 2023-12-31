import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { resetState, getDogs, getTemperaments } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./NavBar.module.css";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(resetState());
    dispatch(getDogs());
    dispatch(getTemperaments());
  };

  return (
    <div className={style.container}>
      <NavLink to="/home" className={style.linkTitle} onClick={handleHomeClick}>
        <h1 className={style.title}>DOG APP!</h1>
      </NavLink>
      <NavLink to="/home" className={style.link}>
        <button className={style.homeButton}>HOME</button>
      </NavLink>
      {location.pathname === "/home" && <SearchBar />}
      {location.pathname !== "/create" && (
        <NavLink to="/create" className={style.link}>
          <button className={style.createButton}>CREATE YOUR DOG</button>
        </NavLink>
      )}
    </div>
  );
};

export default NavBar;
