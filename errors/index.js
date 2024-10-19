const CustomAPIError = require('./custom-api')            //Template extends Error
const UnauthenticatedError = require('./unauthenticated') //401
const NotFoundError = require('./not-found')              //404
const BadRequestError = require('./bad-request')          //400

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}

//When a package is required, and a specific file is not mentioned, index.js is the file imported by default
//This helps by not having to import 4 files in 4 different variables, just import an index.js and deconstruct the funcions / objects needed.