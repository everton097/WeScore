/*
const express = require('express')
const routerCampeonato = express.Router()

const campeonatoController = require('../controllers/campeonatoController')
const checkToken = require('../helpers/check-token')

const fs = require('fs')
const path = require('path')
const multer = require('multer')

//Configuração do multer para tratar os arquivos
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/upload/img/campeonato'))
    },
    filename : (req,file,cb) => {
        const filename = Date.now() + path.extname(file.originalname)
        cb(null,filename)
    }
})
const upload = multer({storage})

// Middleware para verificar se uma imagem foi enviada
const validateImage = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
    }
    next();//passa o controle para o próximo middleware ou rota
}

//Rotas para Campeonato
routerCampeonato.post('/create',checkToken, upload.single('logoCampeonato'), validateImage, campeonatoController.createCampeonato)
routerCampeonato.get('/all', campeonatoController.getAllCampeonato)//rota publica(sem token)
routerCampeonato.get('/all/:idUsuario',checkToken, campeonatoController.getAllCampeonatoUsuario)
routerCampeonato.get('/:idCampeonato',checkToken, campeonatoController.getCampeonatoByID)
routerCampeonato.post('/',checkToken, campeonatoController.getCampeonatoByNome)
routerCampeonato.put('/:idCampeonato',checkToken,upload.single('logoCampeonato'), campeonatoController.updateCampeonatoByID)
routerCampeonato.delete('/:idCampeonato',checkToken, campeonatoController.deleteCampeonatoByID)

module.exports = routerCampeonato
*/