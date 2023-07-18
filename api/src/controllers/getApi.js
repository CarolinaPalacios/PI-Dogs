const axios = require("axios");
const { API_KEY } = process.env;

const getApi = async () => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const infoData = response.data.map(
      ({ id, name, life_span, image, height, weight, temperament }) => {
        return {
          id,
          name,
          age: life_span,
          image: image.url,
          minHeight: parseInt(height.metric.split("-")[0]),
          maxHeight: parseInt(height.metric.split("-")[1]),
          minWeight: parseInt(weight.metric.split("-")[0]),
          maxWeight: parseInt(weight.metric.split("-")[1]),
          temperament: temperament
            ? temperament.split(",").map((temp) => temp.trim())
            : [], // Si la propiedad temperament existe, se divide por comas y se eliminan los espacios vacíos alrededor de cada temperamento. De lo contrario, se asigna un arreglo vacío.
          createdInDB: false,
        };
      }
    );
    return infoData;
  } catch (error) {
    console.log("Ocurrió un error al obtener los datos:", error.message);
  }
};

module.exports = getApi;
