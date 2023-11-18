const express = require('express')
const routerPainelws = express.Router()
const painelwsController = require('../controllers/painelwsController')
const jogosController = require("../controllers/jogosController")

routerPainelws.get('/jogos', jogosController.getJogos);
routerPainelws.get('/campeonatos/:id', );
routerPainelws.get('/', painelwsController.getALLDatas)

module.exports = routerPainelws