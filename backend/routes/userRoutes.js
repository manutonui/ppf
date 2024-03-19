const express = require('express')
const { signup, verify, login, fetchUsers, fetchSingleUser } = require('../controllers/userControls') // import functions
const router = express.Router()
const upload = require('../middleware/fileUpload')
const fs = require('fs');
// const imageType = require('image-type')

// routes
router.post('/signup', upload.single('image'), signup)
router.post('/login', login)
router.get('/confirm/:token', verify)
// router.get('/:id', fetchDetails)
// router.get('/:id', fetchDetails)
// router.patch('/:id', updateUser)
// router.delete('/:id', deleteUser)

router.get('/fetch', fetchUsers)
router.get('/fetch/:id', fetchSingleUser)

module.exports = router