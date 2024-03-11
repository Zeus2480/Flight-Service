//Flight service

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      const message = `Foreign key constraint error: Invalid ${
        error.table
      } ID provided for ${error.fields.join(", ")}.`;
      throw new AppError(message, StatusCodes.BAD_REQUEST);
    }

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explanation = error.errors.map((err) => err.message);
      throw new AppError(explanation.join(", "), StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  if (query.trips) {
    [departureAirportCode, arrivalAirportCode] = query.trips.split("-");
    customFilter.departureAirportCode = departureAirportCode;
    customFilter.arrivalAirportCode = arrivalAirportCode;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.departureDate) {
    customFilter.departureTime = {
      [Op.gte]: query.departureDate,
    };
  }
  if (query.arrivalDate) {
    customFilter.arrivalTime = {
      [Op.gte]: query.arrivalDate,
    };
  }

  if (query.sortBy) {
    let sortCriteria = query.sortBy.split(",");
    sortFilter = sortCriteria.map((criterion) => {
      let [field, order] = criterion.split("_");
      return [field, order.toUpperCase()];
    });
  }

  try {
    const response = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return response;
  } catch (error) {
     throw new AppError(
      "Something wen wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getFlight(data) {
  try {
    const response = await flightRepository.get(data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The resource you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyFlight(data) {
  try {
    const response = await flightRepository.destroy(data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The resource you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateFlight(id, data) {
  try {
    const response = await flightRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The resource you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  destroyFlight,
  updateFlight,
};
