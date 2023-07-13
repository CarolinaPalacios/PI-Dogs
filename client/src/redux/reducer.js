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
  ORDER_BY_WEIGHT,
  RESET_STATE,
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
        detail: payload,
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
        dogsCopy: [...state.dogs, payload],
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
      const sortedByHeight = [...state.dogsCopy];
      const heightAscendingOrder = payload === "minH";

      sortedByHeight.sort((first, second) => {
        const minHeightFirst = parseInt(first.minHeight);
        const maxHeightFirst = parseInt(first.maxHeight);
        const minHeightSecond = parseInt(second.minHeight);
        const maxHeightSecond = parseInt(second.maxHeight);

        const heightFirst = (minHeightFirst + maxHeightFirst) / 2;
        const heightSecond = (minHeightSecond + maxHeightSecond) / 2;

        return heightAscendingOrder
          ? heightFirst - heightSecond
          : heightSecond - heightFirst;
      });

      return {
        ...state,
        dogs: sortedByHeight,
        dogsCopy: sortedByHeight,
      };

    case FILTER_BY_NAME:
      const sortedByName = [...state.dogs].sort((dogA, dogB) => {
        console.log("Reducer: FILTER_BY_WEIGHT, payload:", payload);
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
        dogsCopy: sortedByName,
      };

    case FILTER_BY_ORIGIN:
      const filteredDogsByOrigin =
        payload === "created"
          ? state.dogsCopy.filter((dog) => dog.createdInDB)
          : state.dogsCopy.filter((dog) => !dog.createdInDB);
      return {
        ...state,
        dogs: filteredDogsByOrigin,
      };

    case FILTER_BY_TEMPERAMENT:
      const allDogs = [...state.dogsCopy];
      let filteredDogs = [];

      if (payload === "All") {
        filteredDogs = allDogs;
      } else {
        filteredDogs = allDogs.filter((dog) =>
          dog.temperament?.includes(payload)
        );
      }

      return {
        ...state,
        dogs: filteredDogs, // Actualiza 'dogs' en lugar de 'dogsCopy'
      };

    case ORDER_BY_WEIGHT:
      let sortedDogsByWeight;

      if (payload === "min") {
        sortedDogsByWeight = [...state.dogsCopy].sort(
          (a, b) => parseInt(a.minWeight) - parseInt(b.minWeight)
        );
      } else if (payload === "max") {
        sortedDogsByWeight = [...state.dogsCopy].sort(
          (a, b) => parseInt(b.minWeight) - parseInt(a.minWeight)
        );
      } else {
        // Manejar caso de payload no válido, si es necesario
        sortedDogsByWeight = state.dogsCopy; // Mantener el orden actual
      }

      return {
        ...state,
        dogs: sortedDogsByWeight,
        dogsCopy: sortedDogsByWeight,
      };
    case RESET_STATE:
      return {
        ...initialState,
      };

    default:
      return { ...state };
  }
};

export default reducer;
