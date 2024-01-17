const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.colorize(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    ),
  ),
  transports: [new winston.transports.Console()],
});

const loggerMiddleware = (req, res, next) => {
  const id = req.headers["x-forwarded-for"];
  const browser = req.useragent.browser;
  const os = req.useragent.os;
  logger.info(`${id} (${browser} - ${os}): ${req.method} ${req.url}`);
  next();
};

module.exports = { logger, loggerMiddleware };
