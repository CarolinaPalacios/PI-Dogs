const getAllDogs = require("./getAllDogs");

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;

    const dogs = await getAllDogs();

    if (id) {
      let dog;
      if (!isNaN(id)) {
        // Si el id es un entero, buscar por id como número
        dog = await dogs.find((dog) => dog.id === parseInt(id));
      } else {
        // Si el id no es un entero, buscar por id como cadena de texto (UUID)
        dog = await dogs.find((dog) => dog.id === id);
      }

      return dog
        ? res.status(200).json(dog)
        : res.status(404).send("Dog not found");
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = getDogById;
