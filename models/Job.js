const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, 'Please provide company name'],
        maxlength:50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
    },
    status:{
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    //relationship between models
    createdBy:{
        type: mongoose.Types.ObjectId, //tells mongoose that this type will be from another mongoose schema objectId
        ref: 'User',    //tells mongoose id of what model it is taking it from 
        required: [true , 'please provide user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Job', JobsSchema)