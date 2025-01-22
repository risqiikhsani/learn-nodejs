const winston = require("winston");
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

// Create a Logtail client
const logtail = new Logtail("saikynmwpfCs8vnfPUyNXMbE");

const { combine, timestamp, printf, errors, colorize } = winston.format;

// Define a custom format for pretty CLI logs
const prettyFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let log = `${timestamp} [${level}] : ${message}`;
  if (stack) {
    log += `\nStack: ${stack}`;
  }
  if (Object.keys(meta).length > 0) {
    log += `\nMeta: ${JSON.stringify(meta, null, 2)}`;
  }
  return log;
});

// Create the logger
const logger = winston.createLogger({
  level: "info",
  format: combine(errors({ stack: true }), timestamp()), // Base format
  transports: [
    // Pretty logs for console
    new winston.transports.Console({
      format: combine(colorize({ all: true }), prettyFormat),
    }),
    // JSON format for Logtail
    new LogtailTransport(logtail),
  ],
});

// Test log messages
logger.info("Hello, Winston!");
logger.error(new Error("An error occurred"));
