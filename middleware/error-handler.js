//Error handler will handler every async error thanks to express-async-errors package.

const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

//Create custom error var that checks if err has props if not asigns specific values.
let customError = {
  //set default 
  statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  msg: err.message || 'Something went wrong try again later'
}

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if(err.name === 'CastError'){
    customError.msg = `ObjectID provided is not the right length of characters`
  }

  
  if(err.code && err.code == 11000){
    customError.msg = `Duplicate value entered for ${err.errorResponse.keyValue.email} field, please choose another value.`
    customError.statusCode = 400 //Bad Request
  }
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }) // will check multiple mongoose errors with this custom Class Error
  return res.status(customError.statusCode).json({msg: customError.msg})
  //this is tailoring the info of the default mongoose error to my own error. 
}

module.exports = errorHandlerMiddleware











