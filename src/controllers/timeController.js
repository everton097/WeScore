/*
const { Op } = require('sequelize')//para utilizar like
const Time = require('../models/time')
const Usuario = require('../models/usuario')
const Jogador = require('../models/jogador')
const path = require('path')
const fs = require('fs')

exports.createTime = async (req,res) => {
  try {
      const {nomeTime, idUsuario} = req.body
      const logoTime = req.file.filename
      //Validações
      if(!nomeTime){
        return res.status(400).json({error : `O campo 'nomeTime' é obrigatorio.`})
      }
      if(!idUsuario){
        return res.status(400).json({error : `O campo 'idUsuario' é obrigatorio.`})
      }
      //Verifica se o time já existe
      const timeExists = await Time.findOne({
          where : {nomeTime : { [Op.like] : `%${nomeTime}%` }}
      })
      if(timeExists){
          return res.status(422).json({message : `Time já existe.`})
      }
      //Verifica se o usuario existe
      const usuarioExists = await Usuario.findOne({
          where : {idUsuario : { [Op.like] : `%${idUsuario}%` }}
      })
      if(!usuarioExists){
          return res.status(404).json({message : `Usuario não existe.`})
      }
      //Cria o time
      const time = await Time.create({
          nomeTime, logoTime, idUsuario
      })
      res.status(200).json({
          status: 'success',
          data: time
      })
  } catch (error) {
      console.log(error)
      res.status(500).json({error : `Erro ao criar o Time.`})
  }
}
exports.getAllTime = async (req, res) => {
  try {
    const times = await Time.findAll({
      include: [{ model: Usuario, attributes: ['nomeUsuario']}],
    });
    if (times) {
      res.json(times);
    } else {
      res.status(404).json({ error: 'Nenhum time encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
exports.getAllTimeJogador = async (req, res) => {
  try {
    const times = await Time.findAll({
      include: [
          { model: Usuario, attributes: ['nomeUsuario']},
          { model: Jogador, attributes: ['idJogador','nomeJogador','sobrenome','numeroCamiseta']}
      ]
    });
    if (times) {
      res.json(times);
    } else {
      res.status(404).json({ error: 'Nenhum time encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
exports.getTimeByIDJogador = async (req, res) => {
  try {
    const { idTime } = req.params;
    const times = await Time.findByPk(idTime, {
      include: [
          { model: Usuario, attributes: ['nomeUsuario']},
          { model: Jogador, attributes: ['idJogador','nomeJogador','sobrenome','numeroCamiseta']}
      ]
    });
    if (times) {
      res.json(times);
    } else {
      res.status(404).json({ error: 'Nenhum time encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
exports.getTimeById = async (req, res) => {
    try {
      const { idTime } = req.params;
      const time = await Time.findByPk(idTime, {
        include: [{ model: Usuario, attributes: ['nomeUsuario']}],
      });
      if (time) {
        res.json(time);
      } else {
        console.log(time)
        res.status(404).json({ error: 'Time não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar time:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
exports.updateTime = async (req, res) => {
    try {
      const { idTime } = req.params;
      const { nomeTime, idUsuario } = req.body;
      const logoTime = req.file.filename
      if(!idTime){
        return res.status(400).json({error : `O campo 'idTime' é obrigatorio.`})
      }
      const time = await Time.findByPk(idTime)
      if (!time) {
        return res.status(404).json({ error: 'Time não encontrado.' });
      }
      //Verifica se o time ja existe
      const timeExists = await Time.findOne({
          where : {nomeTime : { [Op.like] : `%${nomeTime}%` }}
      })
      if(timeExists){
          return res.status(422).json({message : `Time já existe.`})
      }
      if (nomeTime) {
        time.nomeTime = nomeTime;
      }
      //Verifica se usuario existe
      const usuarioExists = await Usuario.findOne({
          where : {idUsuario : { [Op.like] : `%${idUsuario}%` }}
      })
      if(!usuarioExists){
          return res.status(404).json({message : `Usuario não existe.`})
      }
      if (idUsuario) {
        time.idUsuario = idUsuario;
      }
      if (logoTime) {
        const diretorio = path.join('./public/upload/img/time/'+time.logoTime)
        fs.unlinkSync(diretorio, (err) => {
          if (err) {
            return console.error(err)
          }
        })
        time.logoTime = logoTime
      }
      await time.save();
      res.status(200).json(time);
    } catch (error) {
      console.error('Erro ao atualizar time:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
exports.deleteTime = async (req,res) => {
  const {idTime} = req.params
  try {
    //Validações
    if(!idTime){
      return res.status(400).json({error : `O campo 'idTime' é obrigatorio.`})
    }
    const time = await Time.findByPk(idTime)
    if (time) {
      const diretorio = path.join('./public/upload/img/time/'+time.logoTime)
      fs.unlinkSync(diretorio, (err) => {
        if (err) {
          return console.error(err)
        }
      })
    }
    const deleted = await Time.destroy({
      where : { idTime }
    })
    if(deleted){
        res.status(200).json({message : `Time excluído com sucesso`})
    } else {
        res.status(404).json({error : `Time não encontrado`})
    }
  } catch (error) {
      console.error(`Erro ao deletar ${error}`)
      res.status(500).json({error:`Erro ao excluir o time`})        
  }
}
*/