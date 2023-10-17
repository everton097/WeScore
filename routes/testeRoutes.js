const express = require('express')
const router = express.Router()
const RegistroController = require('../controllers/registrosController')


router.get('/userLogado',RegistroController.mostrarRegistros)

module.exports = router