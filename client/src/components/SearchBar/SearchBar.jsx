// import { useState } from "react";
// import { getDogByName } from "../../redux/actions";
// import { useDispatch } from "react-redux";
// import style from "./SearchBar.module.css";

// const SearchBar = () => {
//   const dispatch = useDispatch();

//   const [dogName, setDogName] = useState({
//     name: "",
//   });

//   const handleSubmit = () => {
//     const name = dogName.name;
//     if (name.length > 0) {
//       dispatch(getDogByName(name));
//     }
//   };

//   const handleChange = (event) => {
//     event.preventDefault();
//     setDogName({ name: event.target.value });
//   };

//   return (
//     <div className={style.searchBar}>
//       <input
//         type="search"
//         placeholder="Search by name"
//         value={dogName.name}
//         onChange={handleChange}
//       />
//       <button onClick={handleSubmit}>Search</button>
//     </div>
//   );
// };

// export default SearchBar;
