const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require("../models");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Sequelize } = require("sequelize");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
  async getAllFlights(filter, sort) {
    try {
      const response = await Flight.findAll({
        where: filter,
        order: sort,
        include: [
          {
            model: Airplane,
            required: true,
            as: "airplane_detail",
          },
          {
            model: Airport,
            required: true,
            as: "departure_airport",
            on: {
              col1: Sequelize.where(
                Sequelize.col("Flight.departureAirportCode"),
                "=",
                Sequelize.col("departure_airport.code")
              ),
            },
          },
          {
            model: Airport,
            required: true,
            as: "arrival_airport",
            on: {
              col1: Sequelize.where(
                Sequelize.col("Flight.arrivalAirportCode"),
                "=",
                Sequelize.col("arrival_airport.code")
              ),
            },
          },
        ],
      });
      return response;
    } catch (error) {
      console.log("error flight repo", error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = FlightRepository;
