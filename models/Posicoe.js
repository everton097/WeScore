const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')
const Ponto = require('./Ponto') 
const Jogador = require('./Jogador')

const Posicoe = db.define('Posicoe', {
    idPosicoe : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    posicao : {
        type : Sequelize.STRING,
        allowNull : false
    }

})

Ponto.hasMany(Posicoe, { foreignKey : 'idPonto'})
Jogador.hasMany(Posicoe, { foreignKey : 'idJogador'})

module.exports = Posicoe