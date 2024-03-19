const mongoose = require('mongoose')

const {Schema,model} = mongoose

const incidentSchema = new Schema({
    type: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String},
    location: {type: String},
    telephone: {type: Number},
    reportedby: {type: String}, // name
    active: {type: Boolean, default: true}
})

module.exports = model('Incident', incidentSchema);