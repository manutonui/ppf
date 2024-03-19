const mongoose = require('mongoose')

const {Schema,model} = mongoose

const clearanceSchema = new Schema({
    fullname: {type: String, required: true},
    destination: {type: String, required: true},
    birthdate: {type: Date, required: true},
    address: {type: String, required: true},
    telephone: {type: Number},
    gender: {type: String, required: true},
    mother: {type: String},
    birthplace: {type: String},
    occupation: {type: String},
    nationality: {type: String},
    minors: {type: Number, default: 0},
    passport: {type: Number},
    remarks: {type: String},
    guarantor: {type: String},
    guarantoraddress: {type: String},
    guarantortel: {type: Number},
    citizenphoto: {type: String},
    guarantorphoto: {type: String},
    active: {type: Boolean, default: true, required: true}
})

module.exports = model('Clearance', clearanceSchema);