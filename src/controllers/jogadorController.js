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
        console.log(jogador)
        
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
exports.timeAddCampeonato = async (req,res) => {
    try {
        const user = res.locals.user
        const { idCampeonato } = req.params;
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Requisição para retorno do campeonato a ser inserido o time.
        let response = await api.get(`/campeonato/${idCampeonato}`, config)
        const campeonato = response.data
        // Requisição para retorno dos IDs times do campeonato.
        response = await api.get(`/time_campeonato/${idCampeonato}`, config)
        const idtimes = response.data.idtime
        // Requisição para retorno dos times do usuário logado.
        response = await api.get(`/time/all/${user.userId}`, config)
        const todosTimes = response.data

        // Filtrar os times que não estão presentes nos IDs da partida
        const time = todosTimes.filter(time => !idtimes.includes(time.idTime));
        res.render('jogador/timeAdd', { campeonato, time, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}
exports.partidaAddCampeonato = async (req,res) => {
    try {
        const user = res.locals.user
        const { idCampeonato } = req.params;
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Requisição para retorno do campeonato a ser inserido a Partida.
        let response = await api.get(`/campeonato/${idCampeonato}`, config)
        const campeonato = response.data
        // Requisição para retorno dos IDs times vinculado ao campeonato.
        response = await api.get(`/time_campeonato/${idCampeonato}`, config)
        const idtimes = response.data.idtime
        // Requisição para retorno dos IDs times das partidas do campeonato.
        response = await api.get(`/partida/IDs/${idCampeonato}`, config)
        const partidasIDtimes = response.data.idtime
        // Requisição para retorno dos times do usuário logado.
        response = await api.get(`/time/all/${user.userId}`, config)
        const todosTimes = response.data

        // Filtrar os times que não estão presentes nos IDs da partida
        const timelist = todosTimes.filter(time => idtimes.includes(time.idTime));
        // Filtrar os times que não estão presentes nos IDs da partida
        const time = timelist.filter(time => !partidasIDtimes.includes(time.idTime));

        res.render('jogador/partidaAdd', { campeonato, time, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
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