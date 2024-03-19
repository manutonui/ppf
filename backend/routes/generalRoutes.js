const express = require('express')
const { fetchStats } = require('../controllers/generalControls') // import functions
const router = express.Router()

// routes
router.get('/summary', fetchStats)

module.exports = router