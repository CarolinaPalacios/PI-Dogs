import style from "./Card.module.css";

const Card = ({
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
    <div className={style.container}>
      <img src={image} alt={name} className={style.cardImage} />
      <h3 className={style.name}>Name: {name}</h3>
      {createdInDB && Array.isArray(temperament) && temperament.length ? (
        <p className={style.temperaments}>
          Temperament: {temperament.join(", ")}
        </p>
      ) : Array.isArray(temperament) && temperament.length ? (
        <p className={style.temperaments}>
          Temperaments: {temperament?.join(", ")}
        </p>
      ) : null}
      <p className={style.weight}>Weigth: {weight}</p>
    </div>
  );
};

export default Card;
