const logger = require("./logger");
const morgan = require("morgan");

morgan.token("body", (req) => {
  // Log - if there's no body and {} if there's an empty body
  if (req.get("Content-Length")) {
    return JSON.stringify(req.body);
  }
  return null;
});
const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
