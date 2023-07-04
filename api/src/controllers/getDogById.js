const getAllDogs = require("./getAllDogs");

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;

    const dogs = await getAllDogs();

    if (id) {
      const dogId = await dogs.find((dog) => dog.id === parseInt(id));
      return dogId
        ? res.status(200).json(dogId)
        : res.status(404).send("Dog not found");
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = getDogById;
