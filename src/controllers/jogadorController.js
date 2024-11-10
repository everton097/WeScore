const api = require('../config/api')
const apiUrl = "http://localhost:3001/"
const spaUrl = "http://localhost:3002/"

// Metodo para buscar todos os elementos da api
exports.getALLDatas = async (req,res) => {
    try {
        const user = res.locals.user
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Fazer a requisição para a API
        let response = await api.get("/jogador/all", config)
        const jogador = response.data
        
        res.render('jogador/', { jogador, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}
exports.addCampeonato = async (req,res) => {
    const user = res.locals.user
    res.render('jogador/add', { user, spaUrl, apiUrl, layout : 'painelws'})
}

exports.editJogadorByID = async (req,res) => {
    try {
        const user = res.locals.user
        const { idJogador } = req.params;
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Fazer a requisição para a API
        let response = await api.get(`/jogador/${idJogador}`, config)
        const jogador = response.data
        
        res.render('jogador/edit', { jogador, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas para editar jogador.' });
    }
}