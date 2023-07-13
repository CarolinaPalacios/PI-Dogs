import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { resetState, getDogs, getTemperaments } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./NavBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(resetState());
    dispatch(getDogs());
    dispatch(getTemperaments());
  };

  return (
    <div className={style.container}>
      <NavLink to="/home" className={style.link}>
        <button className={style.homeButton} onClick={handleHomeClick}>
          HOME
        </button>
      </NavLink>
      <SearchBar />
      <NavLink to="/create" className={style.link}>
        <button className={style.createButton}>CREATE YOUR DOG</button>
      </NavLink>
    </div>
  );
};

export default NavBar;
