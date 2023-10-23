/*
const { Op } = require('sequelize')
const Campeonato = require('../models/campeonato')
const Usuario = require('../models/usuario')
const path = require('path')
const fs = require('fs')

exports.createCampeonato = async (req,res) => {
    try {
        const { nomeCampeonato, idUsuario} = req.body
        const logoCampeonato = req.file.filename
        console.log("nome:"+nomeCampeonato + "id: "+ idUsuario+ "logo: "+logoCampeonato)

        //Validações
        if(!nomeCampeonato){
            return res.status(400).json({error : `O campo 'nome' é obrigatorio.`})
        }
        if(!idUsuario){
            return res.status(400).json({error : `O campo 'idUsuario' é obrigatorio.`})
        }
        //Verifica se o campeonato já existe
        const campeonatoExists = await Campeonato.findOne({
            where : {nomeCampeonato : { [Op.like] : `%${nomeCampeonato}%` }}
        })
        if(campeonatoExists){
            return res.status(422).json({message : `Campeonato já existe.`})
        }
        //Verifica se o usuario existe
        const usuarioExists = await Usuario.findOne({
            where : {idUsuario : { [Op.like] : idUsuario }}
        })
        if(!usuarioExists){
            return res.status(404).json({message : `Usuario não existe.`})
        }
        //Cria o campeonato
        const campeonato = await Campeonato.create({
            nomeCampeonato, logoCampeonato, idUsuario
        })
        res.status(200).json({
            status: 'success',
            data: campeonato
        })
    } catch (error)
    {
        console.log("nome:"+req.body.nomeCampeonato + "id: "+ req.body.idUsuario+ "logo: "+req.body.logoCampeonato + "Filenema: "+req.file.filename)
        console.log(error)
        res.status(500).json({error : `Erro ao criar campeonato.`})
    }
}
exports.getAllCampeonato = async (req, res) => {
    try {
        const campeonato = await Campeonato.findAll({
            include: [{ model: Usuario, attributes: ['nomeUsuario']}],
        });
        if (campeonato) {
            res.json(campeonato);
        } else {
            res.status(404).json({ error: 'Nenhum campeonato encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar campeonato:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
exports.getAllCampeonatoUsuario = async (req, res) => {
    try {
        const campeonato = await Campeonato.findAll({
            include: [
                { model: Usuario, attributes: ['nomeUsuario']},
            ],
            where : {idUsuario : req.params.idUsuario}
        });
        if (campeonato) {
            res.json(campeonato);
        } else {
            res.status(404).json({ error: 'Nenhum campeonato encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar campeonato:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
exports.getCampeonatoByID = async (req,res) => {
    try {
        const { idCampeonato } = req.params
        if(!idCampeonato){
            return res.status(400).json({error : `O campo 'idCampeonato' é obrigatorio.`})
        }
        const campeonato = await Campeonato.findByPk(idCampeonato, {
            include: [
                { model: Usuario, attributes: ['nomeUsuario']},
            ]
        })
        if (!campeonato) {
            return res.status(404).json({ error: 'Campeonato não encontrado.' });
        }
        res.status(200).json({
            status: 'success',
            data: campeonato
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Erro ao buscar o campeonato.`})
    }
}
exports.getCampeonatoByNome = async (req,res) => {
    try {
        const { nomeCampeonato } = req.body

        if(!nomeCampeonato){
            console.log(nomeCampeonato)
            return res.status(400).json({error : `O campo 'nomeCampeonato' é obrigatorio.`})
        }
        const campeonato = await Campeonato.findOne({
            include: [
                { model: Usuario, attributes: ['nomeUsuario']},
            ],
            where : {nomeCampeonato : { [Op.like] : `%${nomeCampeonato}%` }}
        })
        if (!campeonato) {
            return res.status(404).json({ error: 'Campeonato não encontrado.' });
        }
        res.status(200).json({
            status: 'success',
            data: campeonato
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Erro ao buscar o campeonato.`})
    }
}
exports.updateCampeonatoByID = async (req,res) => {
    try {
        const { idCampeonato } = req.params;
        const {nomeCampeonato, idUsuario} = req.body
        const logoCampeonato = req.file.filename
        if(!idCampeonato){
            return res.status(400).json({error : `O campo 'idCampeonato' é obrigatorio.`})
        }
        const update = await Campeonato.findByPk(idCampeonato)
        if (!update) {
            return res.status(404).json({ error: 'Campeonato não encontrado.' });
        }
        //Verifica se o campeonato já existe
        const campeonatoExists = await Campeonato.findOne({
            where : {nomeCampeonato : { [Op.like] : `%${nomeCampeonato}%` }}
        })
        if(campeonatoExists){
            return res.status(422).json({message : `Campeonato já existe.`})
        }else{update.nomeCampeonato = nomeCampeonato}
        //Verifica se o usuario existe
        const usuarioExists = await Usuario.findOne({
            where : {idUsuario : { [Op.like] : idUsuario }}
        })
        if(!usuarioExists){
            return res.status(404).json({message : `Usuario não existe.`})
        }else{update.idUsuario = idUsuario}
        if (logoCampeonato) {
            const diretorio = path.join('./public/upload/img/campeonato/'+update.logoCampeonato)
            fs.unlinkSync(diretorio, (err) => {
                if (err) {
                    return console.error(err)
                }
            })
            update.logoCampeonato = logoCampeonato
        }
        //Atualiza o campeonato
        await update.save()
        res.status(200).json({
            status: 'success',
            data: update
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Erro ao atualizar o campeonato.`})
    }
}
exports.deleteCampeonatoByID = async (req,res) => {
    try {
        const { idCampeonato } = req.params
        if(!idCampeonato){
            return res.status(400).json({error : `O campo 'idCampeonato' é obrigatorio.`})
        }
        const campeonato = await Campeonato.findByPk(idCampeonato)
        if (!campeonato) {
            return res.status(404).json({ error: 'Campeonato não encontrado.' });
        }

        //Delete a logo do campeonato
        const diretorio = path.join('./public/upload/img/campeonato/'+campeonato.logoCampeonato)
        fs.unlinkSync(diretorio, (err) => {
            if (err) {
                return console.error(err)
            }
        })
        //Deleta o campeonato
        await campeonato.destroy()
        res.status(200).json({
            message : `Time excluído com sucesso.`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Erro ao deletar o campeonato.`})
    }
}
*/
