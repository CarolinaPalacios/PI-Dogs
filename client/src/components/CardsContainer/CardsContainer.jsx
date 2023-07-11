import Card from "../Card/Card";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const allDogs = useSelector((state) => state.dogsCopy);
  const DOGS_PER_PAGE = 8;
  const totalPages = Math.ceil(allDogs.length / DOGS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * DOGS_PER_PAGE;
  const firstIndex = lastIndex - DOGS_PER_PAGE;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);

  return (
    <div>
      <div className={style.cardContainer}>
        {currentDogs.map(
          ({
            id,
            name,
            age,
            image,
            height,
            weight,
            temperament,
            createdInDB,
          }) => {
            return (
              <NavLink to={`/detail/${id}`} className={style.link} key={id}>
                <Card
                  id={id}
                  name={name}
                  age={age}
                  image={image}
                  height={height}
                  weight={weight}
                  temperament={temperament}
                  DBCreated={createdInDB}
                />
              </NavLink>
            );
          }
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CardsContainer;
