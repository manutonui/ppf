const express = require('express')
const { newClearance, fetchClearances, updateClearance, deleteClearance } = require('../controllers/clearanceControls') // import functions
const router = express.Router()
const upload = require('../middleware/fileUpload')

// routes
router.post('/new', upload.fields([{name: 'citizen-image'}, {name: 'guarantor-image'}]), newClearance)
router.patch('/update/:id', upload.fields([{name: 'citizen-image'}, {name: 'guarantor-image'}]), updateClearance)
router.delete('/delete/:id', deleteClearance)
router.get('/', fetchClearances)

module.exports = router