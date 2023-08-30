import { createLogger, format, transports } from "winston";
import "setimmediate";

const { printf, combine, timestamp } = format;

export const logger = createLogger({
  transports: [
    process.env["NODE_ENV"] === "development"
      ? new transports.Console({
          level: "info",
          format: combine(
            timestamp(),
            printf(({ level, message, timestamp }) => {
              return `[${timestamp}] - ${level} - ${message}`;

              // return `${dim(`[${timestamp}]`)} ${green("-")} ${bgBlue(` ${level} `)} ${green("-")} ${white(message)}`;
            })
          )
        })
      : new transports.File({ filename: "logger.log", level: "info" })
  ]
});
