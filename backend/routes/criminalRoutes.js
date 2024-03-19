const express = require('express')
const { newCriminal, fetchCriminals } = require('../controllers/criminalControls') // import functions
const router = express.Router()
const upload = require('../middleware/fileUpload')

// routes
router.post('/new', upload.single({name: 'criminal-image'}), newCriminal)
router.get('/', fetchCriminals)

module.exports = router