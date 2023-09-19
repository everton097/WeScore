const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')
const Time = require('./Time');

const Partida = db.define('Partida', {
    idPartida : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    qtdeSets : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
})
//Time possui muitos Jogadores do time 1
Time.hasMany(Partida, { foreignKey : 'idTime1'})
//Time possui muitos Jogadores do time 2
Time.hasMany(Partida, { foreignKey : 'idTime2'})

module.exports = Partida