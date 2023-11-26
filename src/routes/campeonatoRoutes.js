// routes/campeonatoRoutes.js

const express = require('express');
const routerCampeonato = express.Router();
const campeonatoController = require('../controllers/campeonatoController');
//const checkToken = require('../helpers/check-token')

// importa o método para verificar a sessão do usuário
//const checkSession = require("../helpers/sessao").checkSession;

// Rota para Campeonatos
routerCampeonato.post('/campeonatosCreate/', campeonatoController.createCampeonato);
routerCampeonato.get('/campeonatos/', campeonatoController.getAllCampeonatos);
routerCampeonato.get('/campeonatosCreate/', campeonatoController.createCampeonato);
routerCampeonato.get('/campeonatos/:id', campeonatoController.updateCampeonato);

/*
router.get('/campeonatos/',checkSession, campeonatoController.getAllCampeonatos);
router.post('/campeonatosSearch/',checkSession, campeonatoController.searchCampeonatosByTitle);
*/


module.exports = routerCampeonato;