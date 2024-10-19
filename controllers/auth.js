const User = require('../models/User')
const bcrypt = require('bcrypt')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


const register = async (req, res) => {
    //1: validate client request
    //2: hash password
    //3: create user
    //4: generate token 
    //5: send token back
    const user = await User.create({...req.body})//req and sendig request to create document is first.
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name: user.getName()}, token}) //201
}

const login = async ( req, res ) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    
    const user = await User.findOne({email}) //looks up the first 

    if(!user){
        throw new UnauthenticatedError('No user with the email provided is registered in the database')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    
    if(!isPasswordCorrect){
        throw new UnauthenticatedError(`Password for email ${email} is incorrect`)
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token}) //code for item found 200

}

module.exports = {
    register, login 
}