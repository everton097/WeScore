const express = require('express')
const jogadorRouter = express.Router()
const JogadorController = require('../controllers/jogadorController')
const checkToken = require('../helpers/check-token')

jogadorRouter.post('/create',JogadorController.createJogador)
jogadorRouter.get('/all',checkToken,JogadorController.getAllJogador)
//jogadorRouter.put('/:idJogador',checkToken,JogadorController.updateJogador)
//jogadorRouter.delete('/:idJogador',checkToken,JogadorController.deleteJogador)

module.exports = jogadorRouter