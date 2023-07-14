import { deleteDogId, getDogById, deleteDog } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.detail);
  const { id } = useParams();

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDog(id));
      dispatch(deleteDogId());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(getDogById(id));
    return () => {
      dispatch(deleteDogId());
    };
  }, [dispatch, id]);

  return (
    <div className={style.container}>
      <div className={style.textContainer}>
        <h1 className={style.name}>{dog?.name}</h1>
        <br />
        <div className={style.text}>
          <h2>ID | {dog?.id}</h2>
          <h2>MIN HEIGHT | {dog?.minHeight}</h2>
          <h2>MAX HEIGHT | {dog?.maxHeight}</h2>
          <h2>MIN WEIGHT | {dog?.minWeight}</h2>
          <h2>MAX WEIGHT | {dog?.maxWeight}</h2>
          <h2>
            TEMPERAMENTS | {dog?.temperament ? dog.temperament.join(", ") : ""}
          </h2>
          <h2 className={style.age}>LIFE SPAN | {dog?.age}</h2>
        </div>
      </div>
      <div className={style.imageContainer}>
        <img src={dog?.image} alt={dog?.name} className={style.image} />
      </div>
      <button
        onClick={() => handleDelete(dog?.id)}
        className={style.deleteButton}
      >
        Delete Dog
      </button>
    </div>
  );
};

export default Detail;
