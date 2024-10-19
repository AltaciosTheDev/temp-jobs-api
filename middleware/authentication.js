//Auth middleware will handle auth in every protected route in order to avoid repetition. 
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')
const User = require('../models/User')

const authMiddleware = async(req, res,next) => {
    const authHeader = req.headers.authorization
    console.log(req.headers)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token or wrong token provided ')
    }

    const token = authHeader.split(' ')[1]
    console.log(token)
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    }
    catch(error){
        console.log(error)
        throw new UnauthenticatedError('Authorization invalid')
    }
}

module.exports = authMiddleware

