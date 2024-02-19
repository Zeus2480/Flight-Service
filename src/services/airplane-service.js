const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Something wen wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplanes() {
  try {
    const response = await airplaneRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "Something wen wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplane(data) {
  try {
    const response = await airplaneRepository.get(data);
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

async function destroyAirplane(data) {
  try {
    const response = await airplaneRepository.destroy(data);
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

async function updateAirplane(id, data) {
  try {
    const response = await airplaneRepository.update(id, data);
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
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
