const express = require('express')
const router = express.Router()
const TimeController = require('../controllers/timeController')

router.get('/time',TimeController.criarTime)
router.post('/time',TimeController.criarTimePost)

module.exports = router
