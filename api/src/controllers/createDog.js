const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const getAllTemperaments = require("./getAllTemperaments");

const createDog = async (req, res) => {
  try {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      age,
      image,
      temperament,
    } = req.body;
    if (
      !name ||
      !heightMin ||
      !heightMax ||
      !weightMin ||
      !weightMax ||
      !age ||
      !image ||
      !temperament
    )
      throw Error("Missing information to create the dog");

    const dogExists = await Dog.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    if (dogExists) {
      throw new Error("There is already a dog with that name");
    }
    const newDog = await Dog.create({
      name,
      age,
      image,
      height: `${heightMin} - ${heightMax}`,
      weight: `${weightMin} - ${weightMax}`,
      temperament,
    });

    if (temperament && temperament.length > 0) {
      const temperamentCount = await Temperament.count();
      //count() realizar una consulta y contar el número de registros que cumplen ciertas condiciones en una tabla de la base de datos
      if (temperamentCount === 0) await getAllTemperaments();

      const temperamentsFound = [];

      for (let i = 0; i < temperament.length; i++) {
        const temperamentFound = await Temperament.findOne({
          where: { name: temperament[i] },
        });
        if (!temperamentFound)
          throw new Error(`Temperament '${temperament[i]}' does not exist`);
        temperamentsFound.push(temperamentFound);
      }
      await newDog.addTemperaments(temperamentsFound);
      // se establece la relación entre el perro recién creado (newDog) y los temperamentos encontrados. Esto se realiza utilizando el método set, establece los temperamentos asociados al perro en la tabla de relaciones de muchos a muchos.
      newDog.temperament = temperament;
    }
    console.log(newDog);
    return res.status(200).json(newDog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = createDog;

// Ej: {
//   "name": "Golden Retriever",
//   "age": 3,
//   "image": "golden.jpg",
//   "height": 60,
//   "weight": 30,
//   "temperament": ["Friendly", "Intelligent"]
// }
