const mongoose = require('mongoose')

const {Schema,model} = mongoose

const psvSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true},
    dob: {type: Date, required: true},
    address: {type: String, required: true},
    telephone: {type: Number},
    mother: {type: String},
    from: {type: String, required: true},
    to: {type: String, required: true},
    nationality: {type: String},
    passportid: {type: Number},
    guarantor: {type: String},
    guarantoraddress: {type: String},
    guarantortel: {type: Number},
    photo: {type: String}
})

module.exports = model('PSV', psvSchema);