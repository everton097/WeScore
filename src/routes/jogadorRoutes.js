const express = require('express')
const routesJogador = express.Router()
const jogadorController = require('../controllers/jogadorController')

const checkToken = require('../helpers/check-token')
const getUser = require('../helpers/getUser')

// Use o middleware para todas as rotas definidas abaixo
routesJogador.use(checkToken);
routesJogador.use(getUser);

routesJogador.get('/', jogadorController.getALLDatas)
routesJogador.get('/add', jogadorController.addCampeonato)
routesJogador.get('/:idJogador', jogadorController.editJogadorByID)

module.exports = routesJogador
