const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')
const Ponto = require('../models/Ponto') 

const Substituicao = db.define('Substituicao', {
    idSubstituicao : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    idJogadorSaiu : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    idJogadorEntrou : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    posicao : {
        type : Sequelize.STRING,
        allowNull : false
    }

})

Ponto.hasMany(Substituicao, { foreignKey : 'idPonto'})

module.exports = Substituicao 