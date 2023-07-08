const { Dog } = require("../db");
const { Op } = require("sequelize");
const createValidator = async (req, res, next) => {
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
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!heightMin) return res.status(400).json({ error: "Missing heightMin" });
  if (!heightMax) return res.status(400).json({ error: "Missing heightMax" });
  if (!weightMin) return res.status(400).json({ error: "Missing weightMin" });
  if (!weightMax) return res.status(400).json({ error: "Missing weigthMax" });
  if (!age) return res.status(400).json({ error: "Missing age" });
  if (!image) return res.status(400).json({ error: "Missing image" });
  if (!temperament)
    return res.status(400).json({ error: "Missing temperaments" });

  const dogExists = await Dog.findOne({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (dogExists)
    return res
      .status(400)
      .json({ error: "There is already a dog with that name" });

  next();
};
module.exports = createValidator;
