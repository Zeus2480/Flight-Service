const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");
// const { CityMiddlewares } = require("../../middlewares");
// const { AirplaneMiddlewares } = require("../../middlewares");
const router = express.Router();
// /api/v1airplanes POST
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

// /api/v1/airplanes GET
router.get("/", FlightController.getFlights);

// /api/v1/airplanes/:id GET
router.get("/:id", FlightController.getFlight);

// /api/v1/airplanes/:id DELETE
router.delete("/:id", FlightController.destroyFlight);
 
// /api/v1/airplanes/:id PATCH
router.patch("/:id", FlightController.updateFlight);

module.exports = router;
