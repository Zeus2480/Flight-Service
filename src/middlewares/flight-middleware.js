const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { z } = require("zod");

const flightSchema = z
  .object({
    flightNumber: z.string().min(1), // Assuming flightNumber should be a non-empty string
    airplaneId: z.number().int().positive(),
    departureAirportCode: z.string().min(3).max(3), // Assuming airport codes are 3 letters
    arrivalAirportCode: z.string().min(3).max(3),
    arrivalTime: z.string().transform((str) => new Date(str)),
    departureTime: z.string().transform((str) => new Date(str)),
    price: z.number().positive(),
    boardingGate: z.string().optional(),
    totalSeats: z.number().int().positive(),
  })
  .refine((data) => data.arrivalTime > data.departureTime, {
    message: "Arrival time must be greater than departure time",
    path: ["arrivalTime"], // Path indicates which field the error message is related to
  });

function validateCreateRequest(req, res, next) {
  try {
    console.log(req.body);
    const result = flightSchema.safeParse(req.body);
    console.log(result);
    if (!result.success) {
      ErrorResponse.error = new AppError(
        result.error.issues,
        StatusCodes.BAD_REQUEST
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  } catch (error) {
    // ErrorResponse.error = new AppError(
    //   [error.message],
    //   StatusCodes.BAD_REQUEST
    // );
    // return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  //
  next();
}

module.exports = {
  validateCreateRequest,
};
