const dogsRouter = require("express").Router();
const createDog = require("../controllers/createDog");
const deleteDog = require("../controllers/deleteDog");
const getDogById = require("../controllers/getDogById");
const getDogsByName = require("../controllers/getDogByName");

dogsRouter.get("/:id", getDogById);

dogsRouter.get("/", getDogsByName);

dogsRouter.post("/", createDog);

dogsRouter.delete("/:id", deleteDog);

module.exports = dogsRouter;
