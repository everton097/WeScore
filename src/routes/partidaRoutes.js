const express = require('express')
const partidaRouter = express.Router()
const partidaController = require('../controllers/partidaController')

partidaRouter.get('/:idPartida', partidaController.getPartidaCampeonatoById)


module.exports = partidaRouter