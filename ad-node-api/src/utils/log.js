const colors = require('colors/safe')
const service="publistat-coding-api"

function logBase(type, message){
  switch(type.toUpperCase()){
    case "ERROR":
      return colors.red(`${Date.now()} ${service} [${type}] ${message}\n`)
    case "WARNING":
      return colors.yellow(`${Date.now()} ${service} [${type}] ${message}\n`)
    default:
      return `${Date.now()} ${service} [${type}] ${message}\n`
  }
}

function logInfo(message=""){
  const log = logBase("INFO", message)
  process.stdout.write(log)
}

function logWarning(message=""){
  const log = logBase("WARNING", message)
  process.stdout.write(log)
}

function logError(message=""){
  const err = logBase("ERROR", message)
  process.stderr.write(err)
}

function loggerMiddleware(req, res, next){
  logInfo(`${req.method} ${req.url} - ${res.statusCode}`)
  next()
}

module.exports = {
  logInfo,
  logError,
  logWarning,
  loggerMiddleware
}