const express = require('express')
const routesCampeonato = express.Router()
const campeonatoController = require('../controllers/campeonatoController')

const checkToken = require('../helpers/check-token')
const getUser = require('../helpers/getUser')

// Use o middleware para todas as rotas definidas abaixo
routesCampeonato.use(checkToken);
routesCampeonato.use(getUser);

routesCampeonato.get('/', campeonatoController.getALLDatas)
routesCampeonato.get('/add', campeonatoController.addCampeonato)
routesCampeonato.get('/:idCampeonato/time/add', campeonatoController.timeAddCampeonato)
routesCampeonato.get('/:idCampeonato/partida/add', campeonatoController.partidaAddCampeonato)
routesCampeonato.get('/:idCampeonato/partida/:idpartida/edit', campeonatoController.partidaEditCampeonato)
routesCampeonato.get('/:idCampeonato/edit', campeonatoController.editCampeonato)

module.exports = routesCampeonato
