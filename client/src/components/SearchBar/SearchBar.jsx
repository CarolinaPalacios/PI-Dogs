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

  const handleChange = (event) => {
    setDogName(event.target.value);
  };

  const handleSubmit = async () => {
    if (dogName.length > 0) {
      const result = await dispatch(getDogByName(dogName));

      if (result && result.error) {
        alert(result.error);
        setDogName("");
        navigate("/home");
      } else navigate(`/home?name=${dogName}`);
      setDogName("");
    } else alert("Please enter a valid dog name.");
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
