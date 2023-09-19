const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')

const Usuario = db.define('Usuario', {
    idUsuario : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    nomeUsuario : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    senha : {
        type : DataTypes.STRING,
        allowNull : false,
    }
})

module.exports = Usuario