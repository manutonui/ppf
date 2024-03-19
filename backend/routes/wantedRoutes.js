const express = require('express')
const { newWantedPerson, fetchWantedPersons } = require('../controllers/wantedControls') // import functions
const router = express.Router()
const upload = require('../middleware/fileUpload')

// routes
router.post('/new', upload.single({name: 'criminal-image'}), newWantedPerson)
router.get('/', fetchWantedPersons)

module.exports = router