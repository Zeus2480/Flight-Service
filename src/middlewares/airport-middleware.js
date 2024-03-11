const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    (ErrorResponse.data = "Something went wrong while creating the airplane"),
      (ErrorResponse.error = new AppError(
        [
          "Model Number not found in the incoming request in the correct format",
        ],
        StatusCodes.BAD_REQUEST
      ));
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
