import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import style from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <CardsContainer />
    </div>
  );
};

export default HomePage;
