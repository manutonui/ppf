const mongoose = require('mongoose')

const {Schema,model} = mongoose

const wantedSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true},
    dob: {type: Date, required: true},
    address: {type: String, required: true},
    telephone: {type: Number},
    mother: {type: String},
    nationality: {type: String},
    passportid: {type: Number},
    incident: {type: String, required: true},
    datetime: {type: Date, required: true},
    photo: {type: String}
})

module.exports = model('Wanted', wantedSchema);