const express = require('express')
const { fetchChats, fetchUserChats } = require('../controllers/chatControls') // import functions
const router = express.Router()

router.get('/:user1/:user2', fetchChats) // fetch chat between the 2 users
router.get('/:user', fetchUserChats) // fetch chat between the user

module.exports = router