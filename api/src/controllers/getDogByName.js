const getAllDogs = require("./getAllDogs");

const getDogsByName = async (req, res) => {
  const { name } = req.query;
  const dogs = await getAllDogs();
  try {
    if (name) {
      const dogFound = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      ); //* Filtramos lo que nos llega por query y lo parseamos a minúscula para que coicidan con los datos que de el cliente
      return dogFound.length
        ? res.status(200).json(dogFound)
        : res.status(404).json({ msg: "Dog not found" });
    }
    return res.status(200).json(dogs);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = getDogsByName;
