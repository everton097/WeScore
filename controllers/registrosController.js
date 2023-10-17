const { FLOAT } = require('sequelize')
const Pessoas = require('../models/Pessoa')
const Registro = require('../models/Pessoa')

module.exports = class RegistroController {
//Método que listar os redistros no banco

    static mostrarRegistros(req,res){
        Registro.findAll({raw : true}).then((data) => {
            let nenhumRegistro = false 
            if (data.length === 0){
                nenhumRegistro = true
            }
            res.render('/userLogado',{views : data, nenhumRegistro})
        }).catch((err) => console.log(err))
    }
}