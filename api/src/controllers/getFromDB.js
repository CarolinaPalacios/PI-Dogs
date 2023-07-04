const { Dog, Temperament } = require("../db");

//-- Get desde la bdd
const getFromDb = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"], //atributos que quiero traer del modelo ( el id lo trae automático)
      through: {
        attributes: [], //traer a través de los atributos del modelo
      },
    },
  });
};

module.exports = getFromDb;
