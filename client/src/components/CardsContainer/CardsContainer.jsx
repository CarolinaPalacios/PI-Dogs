import Card from "../Card/Card";
import { NavLink, useLocation } from "react-router-dom";
import {
  orderByHeight,
  filterByOrigin,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temperaments);
  const searchParams = new URLSearchParams(location.search);
  const searchedDogName = searchParams.get("name") || "";
  const DOGS_PER_PAGE = 8;
  const totalPages = Math.ceil(allDogs.length / DOGS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const sortedTemps = allTemps?.map((temp) => temp.name).sort();
  const uniqueTemperaments = [...new Set(sortedTemps)]; // Eliminar duplicados

  const filteredDogs = allDogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchedDogName.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * DOGS_PER_PAGE;
  const firstIndex = lastIndex - DOGS_PER_PAGE;
  const currentDogs = filteredDogs.slice(firstIndex, lastIndex);

  useEffect(() => {
    setCurrentPage(1); // Reset currentPage a 1 cuando busque por nombre
  }, [searchedDogName, setCurrentPage]);

  const handleOrderByHeight = (event) => {
    dispatch(orderByHeight(event.target.value));
  };

  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value));
  };

  const handleFilterByOrigin = (event) => {
    setCurrentPage(1);
    dispatch(filterByOrigin(event.target.value));
  };

  const handleFilterByTemperament = (event) => {
    setCurrentPage(1);
    dispatch(filterByTemperament(event.target.value));
  };

  const handleOrderByWeight = (value) => {
    dispatch(orderByWeight(value));
  };

  return (
    <div>
      <div className={style.filters}>
        <select
          onChange={handleOrderByHeight}
          className={style.filterHeight}
          value=""
        >
          <option disabled value="">
            Order By Height
          </option>
          <option value="minH">Minimum</option>
          <option value="maxH">Maximum</option>
        </select>
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
          onChange={handleFilterByOrigin}
          className={style.filterOrigin}
          value=""
        >
          <option disabled value="">
            Filter Your Dogs
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
        <select
          onChange={(event) => handleOrderByWeight(event.target.value)}
          className={style.filterWeight}
          value=""
        >
          <option disabled value="">
            Order By Weight
          </option>
          <option value="min">Minimum</option>
          <option value="max">Maximum</option>
        </select>
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
            <NavLink to={`/dogs/${id}`} className={style.link} key={id}>
              <Card
                id={id}
                name={name}
                age={age}
                image={image}
                minHeight={minHeight}
                maxHeight={maxHeight}
                minWeight={minWeight}
                maxWeight={maxWeight}
                temperament={temperament}
                DBCreated={createdInDB}
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
