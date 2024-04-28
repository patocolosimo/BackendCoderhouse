const winston = require("winston");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  fatal: 5,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
  fatal: "red",
};

const developmentLogger = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: "debug",
    }),
  ],
});

const productionLogger = winston.createLogger({
  levels,
  transports: [
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV === "production") {
  module.exports = productionLogger;
} else {
  module.exports = developmentLogger;
}
