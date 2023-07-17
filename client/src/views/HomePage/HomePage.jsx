import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { getDogs, getTemperaments } from "../../redux/actions";
import style from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (
      filters.height === null &&
      filters.weight === null &&
      filters.origin === null &&
      filters.temperament === null &&
      filters.name === null
    ) {
      dispatch(getDogs());
      dispatch(getTemperaments())
        .then(() => setisLoading(false))
        .catch((error) => console.log(error));
    }
  }, [dispatch, filters]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      <CardsContainer />
    </div>
  );
};

export default HomePage;
