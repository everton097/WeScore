/*

const { Op } = require('sequelize')//para utilizar like
const Usuario = require('../models/usuario')
const path = require('path')
const fs = require('fs')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

exports.createUsuario = async (req,res) => {
    try {
        const {nomeUsuario, email, senha} = req.body
        const logoUsuario = req.file.filename
        //Criptografar a senha
        const salt = bycrypt.genSaltSync(10)
        const hashSenha = bycrypt.hashSync(senha,salt)

        //Validações
        if(!nomeUsuario){
            res.status(400).json({error : `O campo 'nomeUsuario' é obrigatorio.`})
            return
        }
        if(!email){
            res.status(400).json({error : `O campo 'email' é obrigatorio.`})
            return
        }
        if(!senha){
            res.status(400).json({error : `O campo 'senha' é obrigatorio.`})
            return
        }
        //Verifica se o usuario já existe
        const usuarioExists = await Usuario.findOne({
            where : {email : email}
        })
        if(usuarioExists){
            res.status(422).json({message : `Já existe usuário cadastrado com o e-mail: ${email}`})
            return
        }

        const usuario = await Usuario.create({
            nomeUsuario, email, senha : hashSenha, logoUsuario
        })
        res.status(201).json({
            status: 'success',
            data: usuario
        })
    } catch (error) {
        console.log(`Erro ao criar o Usuario.` + error)
        res.status(500).json({error : `Erro ao criar o Usuario.`})
    }
}
exports.getAllUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findAll({
            attributes: [
                'idUsuario',
                'nomeUsuario',
                'email',
                'logoUsuario',
                'createdAt',
                'updatedAt'
            ],
            order: [['createdAt', 'DESC']] // ordenar resultados, novos registros primeiro
            }
        );
    
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Nenhum usuario encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuario:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
exports.getUsuarioById = async (req,res) => {
    try {
        const {idUsuario} = req.params
        //Validações
        if(!idUsuario){
            return res.status(400).json({error : `O campo 'idUsuario' é obrigatorio.`})
        }
        const usuario = await Usuario.findByPk(idUsuario,{
            attributes: [
                'idUsuario',
                'nomeUsuario',
                'email',
                'logoUsuario',
                'createdAt',
                'updatedAt'
            ]})
        if(usuario){
            res.status(200).json(usuario)
        } else {
            res.status(404).json({error : `Usuario não encontrado!`})
        }
    } catch (error) {
        console.error(`Erro ao buscar usuario: ${error}`)
        res.status(500).json({error : `Erro ao buscar usuario.`})
    }
}
exports.getUsuarioByName = async (req, res) => {
    try {
        const { nomeUsuario } = req.query; // Recupera o nome da consulta da query
        // Busque todos os usuarios que contenham o nome informado
        const usuario = await Usuario.findAll({
            where: {
                nomeUsuario: {
                    [Op.like]: `%${nomeUsuario}%`
                }
            },
            attributes: [
                'idUsuario',
                'nomeUsuario',
                'email',
                'logoUsuario',
                'createdAt',
                'updatedAt'
            ],
            order: [['createdAt', 'DESC']] // ordenar resultados, novos registros primeiro
        });
        // Retorne uma resposta com os usuarios encontrados
        return res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar usuarios' });
    }
}
exports.updateUsuario = async (req,res) => {
    try {
        const { idUsuario } = req.params;
        const {nomeUsuario, email, senha} = req.body
        const logoUsuario = req.file.filename
        //Criptografar a senha
        const salt = bycrypt.genSaltSync(10)
        const hashSenha = bycrypt.hashSync(senha,salt)

        if(!idUsuario){
            return res.status(400).json({error : `O campo 'idUsuario' é obrigatorio.`})
        }
        //Verifica se usuario a editar existe
        const update = await Usuario.findByPk(idUsuario)
        if (!update) {
            return res.status(404).json({ error: 'Usuario não encontrado.' });
        }
        //Validações
        //validação para ver se outro usuario já tem este email cadastrado
        const userExists = await Usuario.findOne({
            where: {
                email: email,
                idUsuario: { [Op.ne]: idUsuario }
            } // email igual ao informado e id diferente do usuario atual (Op.ne significa Not Equals {diferente})
        });

        if (userExists) {
            return res.status(422).json({ error: `Já existe outro usuário cadastrado com o e-mail: ${usuario.email}` });
        }

        if(!nomeUsuario){
            return res.status(400).json({error : `O campo 'nomeUsuario' é obrigatorio.`})
        }else{update.nomeUsuario = nomeUsuario}
        if(!email){
            return res.status(400).json({error : `O campo 'email' é obrigatorio.`})
        }else{update.email = email}
        if(!senha){
            return res.status(400).json({error : `O campo 'senha' é obrigatorio.`})
        }else{update.senha = hashSenha}
        if (logoUsuario) {
            const diretorio = path.join('./public/upload/img/usuario/'+update.logoUsuario)
            fs.unlinkSync(diretorio, (err) => {
                if (err) {
                    return console.error(err)
                }
            })
            update.logoUsuario = logoUsuario
        }
        
        await update.save();
        //Retorna o objeto porem sem a senha.
        res.status(200).json({
            status: 'success',
            data: {
                idUsuario: update.idUsuario,
                nomeUsuario: update.nomeUsuario,
                email: update.email,
                logoUsuario: update.logoUsuario,
                createdAt: update.createdAt,
                updatedAt: update.updatedAt
            }
        })
    } catch (error) {
        console.log(`Erro ao atualizar o Usuario.` + error)
        res.status(500).json({error : `Erro ao atualizar o Usuario.`})
    }
}
exports.deleteUsuario = async (req,res) => {
    const {idUsuario} = req.params
    try {
      //Validações
    if(!idUsuario){
    return res.status(400).json({error : `O campo 'idUsuario' é obrigatorio.`})
    }
    const get = await Usuario.findByPk(idUsuario)
    if (get) {
    const diretorio = path.join('./public/upload/img/usuario/'+get.logoUsuario)
    fs.unlinkSync(diretorio, (err) => {
        if (err) {
        return console.error(err)
        }
    })
    }
    const deleted = await Usuario.destroy({
    where : { idUsuario }
    })
    if(deleted){
        res.status(200).json({message : `Usuario excluído com sucesso!`})
    } else {
        res.status(404).json({error : `Usuario não encontrado!`})
    }
    } catch (error) {
        console.error(`Erro ao deletar ${error}`)
        res.status(500).json({error:`Erro ao excluir o Usuario.`})        
    }
}
exports.tokenPost = async (req,res) => {
    const email = req.body.email
    const senha = req.body.senha
    try {
        //Localizar o usuário
        const usuario = await Usuario.findOne({ where: {email}})
        if(!usuario){
            return res.status(404).json({ error: `Usuário não encontrado.`})
        }
        //Compara a senha
        const senhaCorreta = bycrypt.compareSync(senha, usuario.senha)
        if(!senhaCorreta){
            return res.status(401).json({ error: `Senha inválida.`})
        }
        await createUserToken(usuario, req, res)
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: `Erro ao fazer login.`})
    }
}
exports.checkUser = async (req, res) => {
    // Verifica se o cabeçalho 'authorization' está presente na solicitação HTTP.
    if (req.headers.authorization) {
        // Se o cabeçalho 'authorization' existe, chama a função 'getToken' para extrair o token JWT.
        const token = getToken(req)
    
        // Verifica se não foi possível extrair o token ou se o token está vazio.
        if (!token) res.status(401).json({ error: "Acesso negado. Token não enviado!" });
    
        try {
            // Tenta verificar e decodificar o token usando a chave secreta "nossosecret".
            const decoded = jwt.verify(token, "nossosecret");
            // Extrai o ID do usuário do token decodificado.
            const userId = decoded.id;
    
            // Procura um usuário no banco de dados com o ID extraído do token.
            const currentUser = await Usuario.findOne({ where: { id: userId } });
    
            if (!currentUser) res.status(401).json({ error: "Acesso negado. usuário do token é inválido!" });
            // Remove a senha do usuário antes de enviar a resposta.
            currentUser.senha = undefined
    
            // Retorna um status de resposta HTTP 200 (OK) e envia os dados do usuário (sem a senha).
            res.status(200).send(currentUser)
    
        } catch (error) {
            // Se ocorrer um erro durante a verificação ou decodificação do token, retorna um status de resposta HTTP 401 (Não Autorizado) com uma mensagem de erro.
            res.status(401).json({ error: "Acesso negado. Token inválido!" });
        }
    } else {
      // Se o cabeçalho 'authorization' não estiver presente na solicitação HTTP, retorna um status de resposta HTTP 401 (Não Autorizado) com uma mensagem de erro.
        res.status(401).json({ error: "Acesso negado. Token não enviado!" });
    }
}

*/