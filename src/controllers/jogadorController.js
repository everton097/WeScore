//jogadorControler.js

const { Op } = require('sequelize')//para utilizar like
//const Time = require('../models/time')
//const Jogador = require('../models/jogador')

const api = require('../config/api');

exports.createJogador = async (req, res) => {
    try {
        //Renderiza a pagina jogador/create.handlebars
        res.render('arealogada/create');
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Erro ao criar jogador.` })
    }
}
exports.getAllJogador = async (req, res) => {
    try {
        // Faz uma solicitação GET para a API que fornece os cursos
        const response = await api.get('/jogador');

        // Obtenha os dados JSON da resposta
        //const jogador = await Jogador.findAll({ include: [{ model: Time, attributes: ['nomeTime'] }] });
        const jogador = response.data;

        // Renderiza a página jogador/index.handlebars e passa os jogadores como contexto
        /* if (jogador) {
             res.json(jogador);
         } else {
             res.status(404).json({ error: 'Nenhum time encontrado.' });
         }
         */
        res.render('jogador/', { jogador });

    } catch (error) {
        console.error('Erro ao buscar Jogadors:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

/*
exports.updateJogador = async (req, res) => {
    try {
        const { idJogador } = req.params
        const { nomeJogador, sobrenome, cpf, telefone, numeroCamiseta, idTime } = req.body

        const updateJogador = await Jogador.findByPk(idJogador)
        if (!updateJogador) {
            return res.status(404).json({ error: `Jogador não encontrado.` })
        }
        if (!nomeJogador) {
            return res.status(400).json({ error: `O campo 'nomeJogador' é obrigatorio.` })
        } else { updateJogador.nomeJogador = nomeJogador }
        if (!sobrenome) {
            return res.status(400).json({ error: `O campo 'sobrenome' é obrigatorio.` })
        } else { updateJogador.sobrenome = sobrenome }
        if (!telefone) {
            return res.status(400).json({ error: `O campo 'telefone' é obrigatorio.` })
        } else { updateJogador.telefone = telefone }
        if (!numeroCamiseta) {
            return res.status(400).json({ error: `O campo 'numeroCamiseta' é obrigatorio.` })
        } else { updateJogador.numeroCamiseta = numeroCamiseta }
        if (!idTime) {
            return res.status(400).json({ error: `O campo 'idTime' é obrigatorio.` })
        } else { updateJogador.idTime = idTime }

        await updateJogador.save();
        res.status(200).json(updateJogador);
    } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
exports.deleteJogador = async (req, res) => {
    const { idJogador } = req.params
    try {
        if (!idJogador) {
            return res.status(400).json({ error: `O campo 'idJogador' é obrigatorio.` })
        }
        const deleted = await Jogador.destroy({
            where: { idJogador }
        })
        if (deleted) {
            res.status(200).json({ message: `Jogador excluído com sucesso.` })
        } else {
            res.status(404).json({ error: `Jogador não encontrado.` })
        }
    } catch (error) {
        console.error(`Erro ao deletar ${error}`)
        res.status(500).json({ error: `Erro ao excluir o jogador` })
    }
    
}
*/