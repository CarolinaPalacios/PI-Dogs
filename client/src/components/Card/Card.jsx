import style from "./Card.module.css";
import flipStyle from "./FlipCard.module.css";

const Card = ({
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
}) => {
  return (
    <div className={`${style.container} ${flipStyle.flipCard}`}>
      <div className={`${flipStyle.flipCardInner}`}>
        <div className={`${flipStyle.flipCardFront}`}>
          <img src={image} alt={name} className={style.cardImage} />
          <h3 className={style.name}>Name: {name}</h3>
        </div>
        <div className={`${flipStyle.flipCardBack}`}>
          {/* Contenido de la parte trasera */}
          {createdInDB && Array.isArray(temperament) && temperament?.length ? (
            <p className={style.temperaments}>
              Temperaments: {temperament?.join(", ")}
            </p>
          ) : Array.isArray(temperament) && temperament?.length ? (
            <p className={style.temperaments}>
              Temperaments: {temperament?.join(", ")}
            </p>
          ) : null}
          {minWeight && (
            <p className={style.weight}>Minimum weight: {minWeight}</p>
          )}
          {maxWeight && (
            <p className={style.weight}>Maximum weight: {maxWeight}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
