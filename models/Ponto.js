const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')
const Partida = require('./Partida');

const Ponto = db.define('Ponto', {
    idPonto : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    ptTime1 : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    ptTime2 : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    set : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    rodada : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
})

Partida.hasMany(Ponto, { foreignKey : 'idPartida'})

module.exports = Ponto