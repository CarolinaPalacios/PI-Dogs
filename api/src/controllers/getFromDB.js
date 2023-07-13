const { Dog, Temperament } = require("../db");

//-- Get desde la bdd
const getFromDb = async () => {
  const dbDog = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"], //atributos que quiero traer del modelo ( el id lo trae automático)
      through: {
        attributes: [], //traer a través de los atributos del modelo
      },
    },
  });
  const reDogs = dbDog?.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      minWeight: dog.minWeight,
      maxWeight: dog.maxWeight,
      minHeight: dog.minHeight,
      maxHeight: dog.maxHeight,
      age: dog.age,
      image: dog.image,
      createdInDB: dog.createdInDB,
      temperament: dog.temperaments?.map((temperament) => temperament.name),
    };
  });
  return reDogs;
};

module.exports = getFromDb;
