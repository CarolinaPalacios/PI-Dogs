const { Dog, Temperament } = require("../db");

//-- Get desde la bdd
const getFromDb = async () => {
  const dbDog = await Dog.findAll({
    include: {
      model: Temperament, //especifica q se debe incluir el modelo Temperament en la consulta
      attributes: ["name"], //atributos que quiero traer del modelo ( el id lo trae automático)
      through: {
        attributes: [], //indicarle a Sequelize que no incluya ningún atributo de la tabla intermedia en la consulta
      },
    },
  });
  const reDogs = dbDog?.map((dog) => {
    //se crea un nuevo objeto para cada perro, extrayendo los atributos específicos
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
      temperament: dog.temperaments?.map((temperament) => temperament.name), // extraer los temperamentos asociados a cada perro y crear un nuevo arreglo solo con los nombres de los temperamentos
    };
  });
  return reDogs;
};

module.exports = getFromDb;
