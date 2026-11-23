import winston from 'winston'

// const isProduction = process.env.NODE_ENV || 'production'
const isProduction: boolean = process.env.NODE_ENV === "production";
const { combine, timestamp, json, colorize, simple, errors } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),
  format: combine(errors({ stack: true }), timestamp(), json()),
  defaultMeta: { service: "product-store-backend" },
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "info.log",
      level: "info",
    }),
  ],
});

if(!isProduction){
    logger.add(
      new winston.transports.Console({
        format: combine(colorize(), simple()),
      }),
    );
}

export default logger