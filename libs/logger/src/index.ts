import {createLogger, format, transports} from "winston";
import chalk from "chalk";

const {printf, combine, timestamp} = format;

const myFormat = printf(({level, message, timestamp}) => {
  return `${chalk.dim(`[${timestamp}]`)} ${chalk.green("-")} ${chalk.bgBlue(` ${level} `)} ${chalk.green("-")} ${chalk.white(message)}`;
})

export const logger = createLogger({
  transports: [
    process.env['NODE_ENV'] === "development" ?
    new transports.Console({
      level: "info",
      format: combine(timestamp(), myFormat),
    }) :
    new transports.File({ filename: 'logger.log',
      level: "info",
    }),
  ]
});

