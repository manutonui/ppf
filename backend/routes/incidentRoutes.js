const express = require('express')
const { newIncident, fetchIncidents } = require('../controllers/incidentControls') // import functions
const router = express.Router()

// routes
router.post('/new', newIncident)
router.get('/', fetchIncidents)

module.exports = router