import {
  CREATE_DOG,
  DELETE_DOG,
  DELETE_DOG_ID,
  GET_DOGS,
  GET_DOG_BY_ID,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  ORDER_BY_HEIGHT,
  ORDER_BY_NAME,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPERAMENT,
  ORDER_BY_WEIGHT,
  RESET_STATE,
  SHOW_ALERT,
} from "./action-types";
import axios from "axios";

export const getDogs = () => {
  const endpoint = "http://localhost:3001/dogs";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_DOGS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDogById = (id) => {
  const endpoint = `http://localhost:3001/dogs/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_DOG_BY_ID,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const getDogByName = (name) => {
  const endpoint = `http://localhost:3001/dogs?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      if (!data.length) throw Error("Dog not found");

      return dispatch({
        type: GET_DOG_BY_NAME,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const getTemperaments = () => {
  const endpoint = "http://localhost:3001/temperaments";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: [...data],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createDog = (newDog) => {
  const endpoint = "http://localhost:3001/dogs";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, newDog);
      dispatch({
        type: CREATE_DOG,
        payload: data,
      });
      dispatch(showAlert("Dog created successfully", "success"));
      return data;
    } catch (error) {
      dispatch(showAlert(error.response.data.error, "failure"));
    }
  };
};

export const deleteDog = (id) => {
  const endpoint = `http://localhost:3001/dogs/${id}`;
  return async (dispatch) => {
    try {
      if (typeof id === "string") {
        // Caso para id tipo UUID (eliminar de la base de datos)
        const { data } = await axios.delete(endpoint);
        dispatch({
          type: DELETE_DOG,
          payload: data,
        });
        alert(data.message);
        return data;
      } else {
        // Caso para id tipo integer (mostrar mensaje de error)
        return { error: "ApiDogs cannot be removed" }; // Devuelve objeto de error
      }
    } catch (error) {
      alert(error.response?.data || error.message);
    }
  };
};

export const deleteDogId = () => {
  //? Actualización de estado para el detalle
  return {
    type: DELETE_DOG_ID,
  };
};

export const orderByHeight = (payload) => {
  return {
    type: ORDER_BY_HEIGHT,

    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};

export const filterByTemperament = (payload) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
};

export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

export const showAlert = (message, type) => ({
  type: SHOW_ALERT,
  payload: { message, type },
});
