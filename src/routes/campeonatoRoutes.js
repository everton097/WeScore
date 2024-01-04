const express = require('express')
const routesCampeonato = express.Router()
const campeonatoController = require('../controllers/campeonatoController')

routesCampeonato.get('/', campeonatoController.getALLDatas)
routesCampeonato.get('/add', campeonatoController.addCampeonato)

module.exports = routesCampeonato
