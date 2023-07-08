const { Dog, Temperament } = require("../db");
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
      createdInDB,
    } = req.body;

    const newDog = await Dog.create({
      name,
      age,
      image,
      height: `${heightMin} - ${heightMax}`,
      weight: `${weightMin} - ${weightMax}`,
      createdInDB: createdInDB,
    });

    if (temperament && temperament.length > 0) {
      const temperamentCount = await Temperament.count();
      //count() realizar una consulta y contar el número de registros que cumplen ciertas condiciones en una tabla de la base de datos
      if (temperamentCount === 0) await getAllTemperaments();

      await newDog.addTemperaments(temperament);
      // se establece la relación entre el perro recién creado (newDog) y los temperamentos encontrados. Esto se realiza utilizando el método add, establece los temperamentos asociados al perro en la tabla de relaciones de muchos a muchos.
    }

    return res.status(200).json(newDog);
  } catch (error) {
    return res.status(404).json({ error: error.message });
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
