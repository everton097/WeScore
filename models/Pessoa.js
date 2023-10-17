const { DataTypes } = require('sequelize')
const db = require ('../db/conn')

const Pessoas = db.define('Pessoas', {
    nome : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
    },
    senha : {
        type : DataTypes.STRING,
    },
    imagem : {
        type : DataTypes.STRING,
    },
    concluida: {
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
})
module.exports = Pessoas