const { DataTypes, Sequelize } = require('sequelize')
const db = require ('../db/conn')
const Time = require('./Time');

const Jogador = db.define('Jogador', {
    idJogador : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    nome : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    sobreNome : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    cpf : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    telefone : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    numeroCamiseta : {
        type : DataTypes.INTEGER,
        allowNull : false,
    }
})

//Time possui muitos Jogadores
Time.hasMany(Jogador, { foreignKey : 'idTime'})

module.exports = Jogador