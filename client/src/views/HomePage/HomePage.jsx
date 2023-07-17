import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";
import style from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    if (
      filters.height === null &&
      filters.weight === null &&
      filters.origin === null &&
      filters.temperament === null &&
      filters.name === null
    ) {
      dispatch(getDogs());
      dispatch(getTemperaments());
    }
  }, [dispatch, filters]);

  return (
    <div className={style.container}>
      <CardsContainer />
    </div>
  );
};

export default HomePage;
