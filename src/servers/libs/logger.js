import winston from 'winston'

const { createLogger: wCreateLogger, format, transports } = winston
const { combine, timestamp, label, printf, colorize } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

export const createLogger = (name) => wCreateLogger({
  format: combine(
    label({ label: name }),
    timestamp(),
    colorize(),
    myFormat,
  ),
  transports: [new transports.Console()],
})
