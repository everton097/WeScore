/*
const express = require('express')
const routerTime = express.Router()

const timeController = require('../controllers/timeController')
const checkToken = require('../helpers/check-token')

const fs = require('fs')
const path = require('path')
const multer = require('multer')


//Configuração do multer para tratar os arquivos
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/upload/img/time'))
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
    // Se chegou até aqui, a imagem foi enviada
    next();//passa o controle para o próximo middleware ou rota
}

//Rotas para Time
routerTime.post('/create',checkToken, upload.single('logoTime'), validateImage, timeController.createTime)
routerTime.get('/all', timeController.getAllTime)//Rota publica (sem Token)
routerTime.get('/players',checkToken, timeController.getAllTimeJogador)
routerTime.get('/players/:idTime',checkToken, timeController.getTimeByIDJogador)
routerTime.get('/:idTime',checkToken, timeController.getTimeById)
routerTime.put('/:idTime',checkToken,upload.single('logoTime'), timeController.updateTime)
routerTime.delete('/:idTime',checkToken, timeController.deleteTime)

module.exports = routerTime
*/