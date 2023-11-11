const api = require('../config/api')

// Metodo para buscar todos os elementos da api
exports.getALLDatas = async (req,res) => {
    try {
        // Configurar o cabeçalho com a autorização do token
        const token = req.session.token
        console.log(token)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Fazer a requisição para a API
        let response = await api.get("/campeonato/all", config)
        const campeonatos = response.data

        response = await api.get("/partida/all", config)
        const partidas = response.data

        response = await api.get("/time/all", config)
        const times = response.data

        response = await api.get("/jogador/all", config)
        const jogadores = response.data

        res.render('dashboard', { campeonatos, partidas, times, jogadores, layout : 'teste' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}