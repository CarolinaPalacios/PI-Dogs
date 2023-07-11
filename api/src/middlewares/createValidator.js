const { Dog } = require("../db");
const { Op } = require("sequelize");
const createValidator = async (req, res, next) => {
  const { name, height, weight, age, image, temperaments } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!height) return res.status(400).json({ error: "Missing height" });
  if (!weight) return res.status(400).json({ error: "Missing weigth" });
  if (!age) return res.status(400).json({ error: "Missing age" });
  if (!image) return res.status(400).json({ error: "Missing image" });
  if (!temperaments)
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
