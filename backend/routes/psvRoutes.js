const express = require('express')
const { newPsv, fetchPsvs } = require('../controllers/psvControls') // import functions
const router = express.Router()

// routes
router.post('/new', newPsv)
router.get('/', fetchPsvs)

module.exports = router