import winston from "winston";

const transports = [
  new winston.transports.Console({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.cli(),
      winston.format.splat(),
      winston.format.errors({ stack: true }),
    )
  }),
  new winston.transports.File({
    filename: "errors.log",
    level: "error"
  })
];

const logger = winston.createLogger({
  level: "info",
  transports: transports
});

export default logger;