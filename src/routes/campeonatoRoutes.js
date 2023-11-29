// routes/campeonatoRoutes.js

const express = require('express');
const routerCampeonato = express.Router();
const campeonatoController = require('../controllers/campeonatoController');
//const checkToken = require('../helpers/check-token')

// importa o método para verificar a sessão do usuário
//const checkSession = require("../helpers/sessao").checkSession;

// Rota para Campeonatos
routerCampeonato.get('/', campeonatoController.getAllCampeonatos);
routerCampeonato.get('/campeonatoCreate/', campeonatoController.createCampeonato);
routerCampeonato.post('/campeonatoCreate/', campeonatoController.createCampeonato);
routerCampeonato.get('/:id', campeonatoController.updateCampeonato);

/*
router.get('/campeonatos/',checkSession, campeonatoController.getAllCampeonatos);
router.post('/campeonatosSearch/',checkSession, campeonatoController.searchCampeonatosByTitle);
*/


module.exports = routerCampeonato;