import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { getDogs, getTemperaments } from "../../redux/actions";
import style from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const shouldLoadData =
      filters.height === null &&
      filters.weight === null &&
      filters.origin === null &&
      filters.temperament === null &&
      filters.name === null;

    const loadData = async () => {
      try {
        setIsLoading(true);

        if (shouldLoadData) {
          await dispatch(getDogs());
          await dispatch(getTemperaments());
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    loadData();
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
