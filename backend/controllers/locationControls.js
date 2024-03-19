const {Region, City, Station} = require('../models/locationSchema')

const testRefs = async (req, res) => {
    try {
      const region = await Region.create({ name: 'Region A', capital: 'Nbi' });
      const city = await City.create({ name: 'City X', region: region._id });
      await Station.create({ name: 'Station Y', city: city._id });
      res.status(200).json({msg: "Refs created!"})
      console.log("Refs created!")
    } catch (error) {
        res.status(400).json({msg: "Error creating Refs!"})
        console.error('Error creating Refs:', error);
    }
};

const fetchRegions = async (req, res) => {
    try {
        const regions = await Region.find({})
        res.status(200).json(regions)
    } catch (e) {
        console.log("Error fetching regions!")
    }
}

const fetchCities = async (req, res) => {
    const {regionName} = req.params
    try {
        const region = await Region.findOne({name: regionName});
        if (!region) return console.log('Region not found');

        const cities = await City.find({ region: region._id });
        res.status(200).json(cities)
      } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(400).json({msg: "Error fetching cities!"})
      }
}

const createRegion = async (req, res) => {
    const {name, capital} = req.body
    if (!name || !capital) return res.status(400).json({error: "All fields required."})

    try {
        const region = await Region.create({name, capital})
        res.status(200).json(region)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
}

const updateRegion = async (req, res) => {
    const {name, capital} = req.body
    const {id} = req.params
    if (!name || !capital) return res.status(400).json({error: "All fields required."})

    try {
        const region = await Region.findOneAndUpdate({_id:id},{name, capital}, {new: true})
        res.status(200).json(region)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
}

const deleteRegion = async (req, res) => {
    const {id} = req.params
    try {
        const region = await Region.findOneAndDelete({_id: id})
        res.status(200).json(region)
    } catch (e) {
        res.status(400).json({error: "Region not found!"})
    }
}

const createCity = async (req, res) => {
    const {regionName} = req.params
    const {name} = req.body
    if (!name) return res.status(400).json({error: "All fields required."})

    try {
        const region = await Region.findOne({name: regionName});
        const city = await City.create({name, region: region._id})
        res.status(200).json(city)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
}

const updateCity = async (req, res) => {
    console.log("Updating city...")
    const {name} = req.body
    console.log("Request: ", req.body)
    const {id} = req.params
    if (!name) { return res.status(400).json({error: "All fields required."}) }

    try {
        console.log("Trying...")
        const city = await City.findOneAndUpdate({_id:id},{name}, {new: true})
        res.status(200).json(city)
    } catch (e) {
        console.log("Handling error...")
        res.status(400).json({error: e.message })
    }
}

const deleteCity = async (req, res) => {
    const {id} = req.params
    try {
        const city = await City.findOneAndDelete({_id: id})
        res.status(200).json(city)
    } catch (e) {
        res.status(400).json({error: "Region not found!"})
    }
}

const createStation = async (req, res) => {
    const {cityName} = req.params
    const {name} = req.body
    if (!name) return res.status(400).json({error: "All fields required."})

    try {
        const city = await City.findOne({name: cityName});
        const station = await Station.create({name, city: city._id})
        res.status(200).json(station)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
}

const fetchStations = async (req, res) => {
    const {cityName} = req.params
    try {
        const city = await City.findOne({name: cityName});
        if (!city) return console.log('City not found');

        const stations = await Station.find({ city: city._id });
        res.status(200).json(stations)
      } catch (error) {
        console.error('Error fetching stations:', error);
        res.status(400).json({msg: "Error fetching cities!"})
      }
}

const updateStation = async (req, res) => {
    const {name} = req.body
    const {id} = req.params
    if (!name) { return res.status(400).json({error: "All fields required."}) }

    try {
        const station = await Station.findOneAndUpdate({_id:id},{name}, {new: true})
        res.status(200).json(station)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
}

const deleteStation = async (req, res) => {
    const {id} = req.params
    try {
        const station = await Station.findOneAndDelete({_id: id})
        res.status(200).json(station)
    } catch (e) {
        res.status(400).json({error: "Region not found!"})
    }
}

module.exports = { fetchRegions, fetchCities, testRefs, createRegion, updateRegion, deleteRegion, createCity, updateCity, deleteCity, createStation, fetchStations, updateStation, deleteStation }