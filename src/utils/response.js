const successResponse = (res, { statusCode = 200, message = "Success!!", data = {} }) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data,
  });
};
const errorResponse = (res, { statusCode = 500, message = "Internal server error" }) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export { successResponse, errorResponse };
