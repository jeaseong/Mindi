import winston from 'winston';

const transports = [
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
  }),
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
  }),
];

const logger = winston.createLogger({
  level: 'info',
  transports: transports,
});

export default logger;
