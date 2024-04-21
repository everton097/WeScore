const express = require('express')
const routesTime = express.Router()
const timeController = require('../controllers/timeController')

const checkToken = require('../helpers/check-token')
const getUser = require('../helpers/getUser')

// Use o middleware para todas as rotas definidas abaixo
routesTime.use(checkToken);
routesTime.use(getUser);

routesTime.get('/', timeController.getALLDatas)
routesTime.get('/add', timeController.addCampeonato)
routesTime.get('/:idCampeonato/time/add', timeController.timeAddCampeonato)
routesTime.get('/:idCampeonato/partida/add', timeController.partidaAddCampeonato)
routesTime.get('/:idCampeonato/partida/:idpartida/edit', timeController.partidaEditCampeonato)
routesTime.get('/:idTime/edit', timeController.editTime)

module.exports = routesTime
