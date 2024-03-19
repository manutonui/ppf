const express = require('express')
const { fetchCities, fetchRegions, createRegion, updateRegion, deleteRegion, createCity, updateCity,deleteCity, fetchStations, createStation, updateStation, deleteStation } = require('../controllers/locationControls') // import functions
const router = express.Router()

// middleware to routes

// routes
router.get('/regions', fetchRegions)
router.post('/regions', createRegion)
router.patch('/regions/:id', updateRegion)
router.delete('/regions/:id', deleteRegion)

router.get('/cities/:regionName', fetchCities)
router.post('/cities/:regionName', createCity)
router.patch('/cities/:id', updateCity)
router.delete('/cities/:id', deleteCity)

router.get('/stations/:cityName', fetchStations)
router.post('/stations/:cityName', createStation)
router.patch('/stations/:id', updateStation)
router.delete('/stations/:id', deleteStation)

module.exports = router