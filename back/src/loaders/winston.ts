import winston from 'winston';
import config from "../config";

const transports = [];

switch (config.nodeEnv) {
  case "development": {
    transports.push(
      new winston.transports.Console({
        level: 'silly',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.cli(),
          winston.format.splat(),
          winston.format.errors({ stack: true }),
          winston.format.printf((info) => `${info.level} | ${info.message}`),
        ),
      })
    );

    break;
  }
  case "production": {
    transports.push(
      new winston.transports.File({
        filename: 'info.log',
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.splat(),
          winston.format.errors({ stack: true }),
          winston.format.printf((info) => `${info.level} | ${info.message}`),
        ),
      })
    );
    transports.push(
      new winston.transports.File({
        filename: 'errors.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.splat(),
          winston.format.errors({ stack: true }),
          winston.format.printf((info) => `${info.timestamp} | ${info.message}`),
        ),
      })
    );

    break;
  }
  case "test": {
    transports.push(
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.cli(),
          winston.format.splat(),
          winston.format.errors({ stack: true }),
          winston.format.printf((info) => `${info.level} | ${info.message}`),
        ),
      })
    );
    transports.push(
      new winston.transports.File({
        filename: 'errors.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.splat(),
          winston.format.errors({ stack: true }),
          winston.format.printf((info) => `${info.timestamp} | ${info.message}`),
        ),
      })
    );

    break;
  }
}

const logger = winston.createLogger({
  transports: transports,
});

export default logger;
