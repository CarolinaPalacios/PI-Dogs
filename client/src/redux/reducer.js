import {
  CREATE_DOG,
  DELETE_DOG,
  DELETE_DOG_ID,
  GET_DOGS,
  GET_DOG_BY_ID,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  FILTER_BY_HEIGHT,
  FILTER_BY_NAME,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_WEIGHT,
} from "./action-types";

const initialState = {
  dogs: [],
  dogsCopy: [],
  temperaments: [],
  detail: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        dogsCopy: payload,
      };

    case GET_DOG_BY_ID:
      return {
        ...state,
        dogs: payload,
        dogsCopy: payload,
      };

    case GET_DOG_BY_NAME:
      return {
        ...state,
        dogs: payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };

    case CREATE_DOG:
      return {
        ...state,
        dogs: [...state.dogs, payload], //incluye todos los elementos existentes en state.dogs, y luego agrega el nuevo perro payload
      };

    case DELETE_DOG:
      return {
        ...state,
        dogs: state.dogs.filter((dog) => dog.id !== payload.id),
        dogsCopy: state.dogs.filter((dog) => dog.id !== payload.id),
      };

    case DELETE_DOG_ID:
      return {
        ...state,
        detail: [],
      };

    case FILTER_BY_HEIGHT:
      const heightAscendingOrder = payload === "min";
      const sortedByHeight = [...state.dogs].sort((first, second) => {
        const parsedHeight = (height) => {
          const [minHeight, maxHeight] = height.split(" - ");
          const average = (+minHeight + +maxHeight) / 2;
          return isNaN(average) ? -1 : average;
        };
        const heightFirst = parsedHeight(first.height);
        const heightSecond = parsedHeight(second.height);

        return heightAscendingOrder
          ? heightFirst - heightSecond
          : heightSecond - heightFirst;
      });
      return {
        ...state,
        dogs: sortedByHeight,
      };

    case FILTER_BY_NAME:
      const sortedByName = [...state.dogs].sort((dogA, dogB) => {
        return (
          dogA.name.localeCompare(dogB.name, "en", {
            //compara los nombres de los perros. 'en' para especificar que se debe utilizar el idioma inglés y { sensitivity: 'base' } indica que la comparación debe ser sensible a las diferencias de mayúsculas y minúsculas.
            sensitivity: "base",
          }) * (payload === "Asc" ? 1 : -1)
        );
      });
      return {
        ...state,
        dogs: sortedByName,
      };

    case FILTER_BY_ORIGIN:
      const dogsOrigin = state.dogsCopy;
      const filteredDogByOrigin = dogsOrigin.filter((dog) =>
        payload === "created" ? dog.createdInDB : !dog.createdInDB
      );
      return {
        ...state,
        dogs: filteredDogByOrigin,
      };

    case FILTER_BY_TEMPERAMENT:
      const allDogs = state.dogsCopy; // Traigo toda la copia
      let filteredDogs = [];

      if (payload === "All") filteredDogs = allDogs;
      else
        filteredDogs = allDogs.filter((dog) =>
          dog.temperament?.includes(payload)
        );

      const filteredDBDogs = allDogs.filter(
        (dog) =>
          typeof dog.id === "string" && dog.temperament?.includes(payload)
      );
      return {
        ...state,
        dogs: [...filteredDogs, ...filteredDBDogs],
      };

    case FILTER_BY_WEIGHT:
      const weightAscendingOrder = payload === "min ";
      const sortedByWeight = [...state.dogs].sort((first, second) => {
        const parsedWeight = (weight) => {
          const [minWeight, maxWeight] = weight.split(" - ");
          const average = (+minWeight + +maxWeight) / 2;
          return isNaN(average) ? -1 : average;
        };

        const weightFirst = parsedWeight(first.weight);
        const weightSecond = parsedWeight(second.weight);

        return weightAscendingOrder
          ? weightFirst - weightSecond
          : weightSecond - weightFirst;
      });
      return {
        ...state,
        dogs: sortedByWeight,
      };

    default:
      return { ...state };
  }
};

export default reducer;
