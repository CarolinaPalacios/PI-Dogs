import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.container}>
      <NavLink to="/home" className={style.link}>
        <button className={style.homeButton}>HOME</button>
      </NavLink>
      <NavLink to="/create" className={style.link}>
        <button className={style.createButton}>CREATE YOUR DOG</button>
      </NavLink>
    </div>
  );
};

export default NavBar;
