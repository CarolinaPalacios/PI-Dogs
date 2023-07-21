const getApi = require("../controllers/getApi");
const { Dog } = require("../db");
const { Op } = require("sequelize");
const createValidator = async (req, res, next) => {
  const {
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    age,
    image,
    temperaments,
  } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!minHeight) return res.status(400).json({ error: "Missing minHeight" });
  if (!maxHeight) return res.status(400).json({ error: "Missing maxHeight" });
  if (!minWeight) return res.status(400).json({ error: "Missing minWeigth" });
  if (!maxWeight) return res.status(400).json({ error: "Missing maxWeigth" });
  if (!age) return res.status(400).json({ error: "Missing age" });
  if (!image) return res.status(400).json({ error: "Missing image" });
  if (!temperaments)
    return res.status(400).json({ error: "Missing temperaments" });

  const dogExists = await Dog.findOne({
    where: {
      name: {
        [Op.iLike]: `%${name}%`, //realizar una búsqueda de coincidencia parcial insensible a mayúsculas y minúsculas en un campo de texto de la base de datos
      },
    },
  });

  if (dogExists)
    return res
      .status(400)
      .json({ error: "There is already a dog with that name" });

  const apiData = await getApi();
  const apiDogExist = apiData.find(
    (dog) => dog.name.toLowerCase() === name.toLowerCase()
  );

  if (apiDogExist)
    return res
      .status(400)
      .json({ error: "There is already a dog with that name" });

  next();
};

module.exports = createValidator;
