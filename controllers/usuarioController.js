/* const Usuario = require('../models/Usuario')
const Usuario_Time = require('../models/Usuario_Time')

module.exports = class UsuarioController{

    //Método que mostra o formulário de criação da tarefa
    static criarUsuario(req,res){
        res.render('Usuarios/criar')
    }

    //Método que recebe os dados do form e salva no bd
    static async criarUsuarioPost(req, res){
        const new_usuario = {
            cpf : req.body.cpf,
            nome : req.body.nome,
            sobrenome : req.body.sobrenome,
            dataNascimento : req.body.dataNascimento,
            sexo : req.body.sexo,
            tipo : req.body.tipo
        }
        
        await Usuario.create(new_usuario)
            .then(() => {res.redirect('/usuarios')})
            .catch((err)=> console.log(`Erro ao cadastrar usuario  nome:${new_usuario.nome} sobrenome:${new_usuario.sobrenome} cpf:${new_usuario.cpf} datanas:${new_usuario.dataNascimento} sexo:${new_usuario.sexo} tipo:${new_usuario.tipo}  `) + console.log(err))
    }

} */
