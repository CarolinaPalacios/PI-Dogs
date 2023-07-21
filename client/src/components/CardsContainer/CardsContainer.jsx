import Card from "../Card/Card";
import { NavLink, useLocation } from "react-router-dom";
import {
  // orderByHeight,
  filterByOrigin,
  filterByTemperament,
  orderByName,
  orderByWeight,
  resetState,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import logo from "../../assets/reset.svg";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temperaments);
  const searchParams = new URLSearchParams(location.search);
  const searchedDogName = searchParams.get("name") || ""; // obtener el valor de un parámetro de búsqueda
  const DOGS_PER_PAGE = 8;
  const totalPages = Math.ceil(allDogs.length / DOGS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const sortedTemps = allTemps?.map((temp) => temp.name).sort();
  const uniqueTemperaments = [...new Set(sortedTemps)]; // Eliminar duplicados
  const [filtersChanged, setFiltersChanged] = useState(false);

  const filteredDogs = allDogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchedDogName.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * DOGS_PER_PAGE; //calculae el índice del último perro que se mostrará en la página actual
  const firstIndex = lastIndex - DOGS_PER_PAGE; // calcula el índice del primer perro que se mostrará en la página actual
  const currentDogs = filteredDogs.slice(firstIndex, lastIndex);

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage"); // Obtener el valor de la página actual almacenado en el almacenamiento local del navegador
    if (!searchedDogName && storedPage && !filtersChanged) {
      setCurrentPage(parseInt(storedPage)); // Restaurar la página actual si no se realiza una búsqueda y hay una página almacenada en el local storage
    } else if (searchedDogName && currentPage !== 1) {
      setCurrentPage(1); // Reset currentPage a 1 cuando busque por nombre
    }
  }, [searchedDogName, currentPage, filtersChanged]);

  // const handleOrderByHeight = (event) => {
  //   dispatch(orderByHeight(event.target.value));
  // };

  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value));
  };

  const handleFilterByOrigin = (event) => {
    setCurrentPage(1);
    dispatch(filterByOrigin(event.target.value));
    setFiltersChanged(true);
  };

  const handleFilterByTemperament = (event) => {
    setCurrentPage(1);
    dispatch(filterByTemperament(event.target.value));
    setFiltersChanged(true);
  };

  const handleOrderByWeight = (event) => {
    dispatch(orderByWeight(event.target.value));
  };

  const handleReset = () => {
    dispatch(resetState());
  };

  return (
    <div>
      <div className={style.filters}>
        {/* <select
            onChange={handleOrderByHeight}
            className={style.filterHeight}
            value=""
          >
            <option disabled value="">
              Order By Height
            </option>
            <option value="minH">Minimum</option>
            <option value="maxH">Maximum</option>
          </select> */}
        <select
          onChange={handleOrderByName}
          className={style.filterName}
          value=""
        >
          <option disabled value="">
            Order By Name
          </option>
          <option value="Asc">Ascending</option>
          <option value="Desc">Descending</option>
        </select>
        <select
          onChange={handleOrderByWeight}
          className={style.filterWeight}
          value=""
        >
          <option disabled value="">
            Order By Weight
          </option>
          <option value="min">Minimum</option>
          <option value="max">Maximum</option>
        </select>
        <select
          onChange={handleFilterByOrigin}
          className={style.filterOrigin}
          value=""
        >
          <option disabled value="">
            Filter By Source
          </option>
          <option value="All">Api Dogs</option>
          <option value="created">Your Dogs</option>
        </select>
        <select
          onChange={handleFilterByTemperament}
          className={style.filterTemperament}
          value=""
        >
          <option disabled value="">
            Filter By Temperaments
          </option>
          <option value="All">All Temperaments</option>
          {uniqueTemperaments?.map((temp) => (
            <option key={temp} value={temp}>
              {temp}
            </option>
          ))}
        </select>
        <div className={style.resetContainer}>
          <button className={style.reset} onClick={handleReset}>
            <img src={logo} alt="reset" className={style.logoreset} />
          </button>
        </div>
      </div>
      <div className={style.cardContainer}>
        {currentDogs.map(
          ({
            id,
            name,
            age,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            temperament,
            createdInDB,
          }) => (
            <NavLink to={`/detail/${id}`} className={style.link} key={id}>
              <Card
                id={id}
                name={name}
                age={age}
                image={image}
                minHeight={minHeight}
                maxHeight={maxHeight}
                minWeight={minWeight}
                maxWeight={maxWeight}
                temperament={temperament.sort()}
                createdInDB={createdInDB}
              />
            </NavLink>
          )
        )}
      </div>
      {filteredDogs.length > DOGS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CardsContainer;
