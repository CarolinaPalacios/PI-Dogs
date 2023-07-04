const { Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

// GET | /temperaments
const getAllTemperaments = async (req, res) => {
  try {
    const temperamentData = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    temperamentData.data.forEach((dog) => {
      if (dog.temperament) {
        let temperaments = dog.temperament.split(", ");
        //* se divide su valor en temperamentos individuales utilizando split(", "). Esto crea un array de temperamentos.
        temperaments.forEach((dogTemp) => {
          Temperament.findOrCreate({
            where: { name: dogTemp },
          });
        });
      }
    });
    const tempsFound = await Temperament.findAll();
    return res.status(200).json(tempsFound); //Guardo todos los temperamentos
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = getAllTemperaments;
