const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please prpovide valid email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minlength:6
    }
})

//remember eveything dealing with the db, is going to be async.
//using normal syntax, this will refer to the document. 
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) //we already have access to all the req.body, the Create function took care of that. 
})

UserSchema.methods.getName = function () {
    return this.name
}

//if not done this way, would've had to do process twice: register, and login in controller.
//example of encapsulation so logic stays hidden.
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

//example of encapsulation
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch 
}

module.exports = mongoose.model('User', UserSchema) //returns user model

