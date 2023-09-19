const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')
const Usuario = require('./Usuario');

const Campeonato = db.define('Campeonato', {
    idCampeonato : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    nomeCampeonato : {
        type : DataTypes.STRING,
        allowNull : false,
    }
})

//Time possui muitos Usuarios
Usuario.hasMany(Campeonato, { foreignKey : 'idUsuario'})

module.exports = Campeonato