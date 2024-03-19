const mongoose = require('mongoose')

const {Schema,model} = mongoose

const regionSchema = new Schema({
    name: {type: String, required: true, unique: true},
    capital: {type: String, required: true, unique: true}
})

const citySchema = new Schema({
    name: { type: String, required: true },
    region: { type: Schema.Types.ObjectId, ref: 'Region', required: true },
});

const stationSchema = new Schema({
    name: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true }, // type is a reference to an object id of type 'city'
});

const Station = model('Station', stationSchema);
const City = model('City', citySchema);
const Region = model('Region', regionSchema);

module.exports = {Region, City, Station};