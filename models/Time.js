const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')
const Time_Campeonato = require('./Time_Campeonato')
const Campeonato = require('./Campeonato')
const Usuario = require('./Usuario');


const Time = db.define('Time', {
    idTime : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    nomeTime : {
        type : DataTypes.STRING,
        allowNull : false,
    }
})
//Time possui muitos Usuarios
Usuario.hasMany(Time, { foreignKey : 'idUsuario'})

//Relacionamento n:m
Time.belongsToMany(Campeonato, { 
    through: {
        model:'Time_Campeonato',
    },
    foreignKey: 'idTime',
    constraints: true
})
Campeonato.belongsToMany(Time, {
    through: {
        model:'Time_Campeonato',
    },
    foreignKey: 'idCampeonato',
    constraints: true
})

module.exports = Time
