const express = require("express");
const { InfoController } = require("../../controllers");
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const flightRoutes = require("./flight-routes");
const airportRoutes = require("./airport-routes");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/flights", flightRoutes);
router.use("/airports", airportRoutes);
router.get("/info", InfoController.info);

module.exports = router;
