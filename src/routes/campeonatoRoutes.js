const express = require('express')
const routesCampeonato = express.Router()
const campeonatoController = require('../controllers/campeonatoController')
const getUser = require('../helpers/getUser')

// Use o middleware getUser para todas as rotas definidas abaixo
routesCampeonato.use(getUser);

routesCampeonato.get('/', campeonatoController.getALLDatas)
routesCampeonato.get('/add', campeonatoController.addCampeonato)

module.exports = routesCampeonato
