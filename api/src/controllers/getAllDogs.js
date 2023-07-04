const getApi = require("./getApi");
const getFromDb = require("./getFromDb");

// RUTA GET /dogs

const getAllDogs = async () => {
  const apiDogs = await getApi(); // Obtener perros de la API externa
  const dbDogs = await getFromDb(); // Obtener los perros de la BDD
  // Concatenar perros de la API y de la base de datos

  const dogs = [...apiDogs, ...dbDogs]; //En esta línea se concatenan los perros de la API y los de la DB en un solo arreglo

  return dogs;
};

module.exports = getAllDogs;
