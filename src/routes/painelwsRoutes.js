const express = require('express')
const routerPainelws = express.Router()
const painelwsController = require('../controllers/painelwsController')

routerPainelws.get('/', painelwsController.getALLDatas)

module.exports = routerPainelws