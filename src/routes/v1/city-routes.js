const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares")
// const { AirplaneMiddlewares } = require("../../middlewares");
const router = express.Router();
// /api/v1airplanes POST
router.post("/",CityMiddlewares.validateCreateRequest, CityController.createCity);

// /api/v1/airplanes GET
router.get("/", CityController.getCities);

// /api/v1/airplanes/:id GET
router.get("/:id", CityController.getCity);

// /api/v1/airplanes/:id DELETE
router.delete("/:id", CityController.destroyCity);

// /api/v1/airplanes/:id PATCH
router.patch("/:id", CityController.updateCity);

module.exports = router;
