import { deleteDogId, getDogById, deleteDog } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.detail);
  const { id } = useParams();
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDogById(id))
      .then(() => setIsLoadingDetail(false))
      .catch((error) => console.log(error));
    return () => {
      dispatch(deleteDogId());
    };
  }, [dispatch, id]);

  const handleDelete = async (id) => {
    const response = await dispatch(deleteDog(id));
    if (response && response.error) {
      alert(response.error);
    } else {
      dispatch(deleteDogId());
      navigate("/home");
      window.location.reload();
    }
  };

  if (isLoadingDetail) {
    return <Loading />;
  }

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
