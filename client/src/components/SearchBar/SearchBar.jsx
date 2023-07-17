import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/lupa.svg";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dogName, setDogName] = useState("");

  const handleSubmit = () => {
    if (dogName.length > 0) {
      dispatch(getDogByName(dogName));
      navigate(`/home?name=${dogName}`);
      setDogName("");
    }
  };

  const handleChange = (event) => {
    setDogName(event.target.value);
  };

  return (
    <div className={style.searchBar}>
      <input
        type="search"
        placeholder="Search by breed name..."
        value={dogName}
        onChange={handleChange}
        className={style.inputSearchBar}
      />
      <button onClick={handleSubmit} className={style.searchButton}>
        <img src={logo} alt="Lupa" className={style.logoButton} />
      </button>
    </div>
  );
};

export default SearchBar;
