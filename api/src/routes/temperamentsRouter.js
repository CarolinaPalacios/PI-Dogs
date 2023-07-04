const express = require("express");
const getAllTemperaments = require("../controllers/getAllTemperaments");
const temperamentRouter = express.Router();

temperamentRouter.get("/", getAllTemperaments);

module.exports = temperamentRouter;
