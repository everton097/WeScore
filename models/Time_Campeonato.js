const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')

const Time_Campeonato = db.define('Time_Campeonato', {
    idTime_Campeonato : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    }
})

module.exports = Time_Campeonato