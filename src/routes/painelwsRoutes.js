const express = require('express')
const routerPainelws = express.Router()
const painelwsController = require('../controllers/painelwsController')
const jogosController = require("../controllers/jogosController")
const getUser = require('../helpers/getUser')

// Use o middleware getUser para todas as rotas definidas abaixo
routerPainelws.use(getUser);

routerPainelws.get('/jogos', jogosController.getJogos);
routerPainelws.get('/campeonatos/:id', );
routerPainelws.get('/', painelwsController.getALLDatas)

module.exports = routerPainelws