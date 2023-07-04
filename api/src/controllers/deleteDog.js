const { Dog } = require("../db");

const deleteDog = async (req, res) => {
  try {
    const { id } = req.params;
    await Dog.destroy({
      where: { id },
    });

    return res.status(200).json({ message: "Dog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteDog;
