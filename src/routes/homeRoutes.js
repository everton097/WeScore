const express = require('express')
const routerHome = express.Router()
const homeController = require('../controllers/homeController')

routerHome.get('/',homeController.getAllBanners)

module.exports = routerHome