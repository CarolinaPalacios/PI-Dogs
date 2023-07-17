const { Dog } = require("../db");

const deleteDog = async (req, res) => {
  try {
    const { id } = req.params;
    const isDBDog = typeof id === "string";
    if (isDBDog) {
      await Dog.destroy({
        where: { id },
      });
      return res.status(200).json({ message: "Dog deleted successfully" });
    }
    return res.status(403).json({ error: "ApiDogs cannot be removed" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete dog" });
  }
};

module.exports = deleteDog;
