/*
const express = require('express')
const routerUsuario = express.Router()

const usuarioController = require('../controllers/usuarioController')
const checkToken = require('../helpers/check-token')

const fs = require('fs')
const path = require('path')
const multer = require('multer')

//Configuração do multer para tratar os arquivos
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/upload/img/usuario'))
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
routerUsuario.post('/create',checkToken, upload.single('logoUsuario'), validateImage, usuarioController.createUsuario)
routerUsuario.get('/all',checkToken, usuarioController.getAllUsuario)
routerUsuario.get('/:idUsuario',checkToken, usuarioController.getUsuarioById)
routerUsuario.get('/',checkToken, usuarioController.getUsuarioByName)
routerUsuario.put('/:idUsuario',checkToken, upload.single('logoUsuario'), validateImage, usuarioController.updateUsuario)
routerUsuario.delete('/:idUsuario',checkToken, usuarioController.deleteUsuario)

routerUsuario.post('/token', usuarioController.tokenPost)
module.exports = routerUsuario
*/