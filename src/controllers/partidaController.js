const api = require('../config/api')
const apiUrl = "http://localhost:3001/"
const spaUrl = "http://localhost:3002/"

exports.getPartidaCampeonatoById = async (req,res) =>{
    try {
        const idPartida = req.params.idPartida
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const user = res.locals.user
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        // Fazer a requisição para a API
        let response = await api.get(`/partida/${idPartida}`, config)
        const partida = response.data

        response = await api.get(`/time/players/${partida.idTime1}`, config)
        const jogadoresTime1 = response.data.Jogadors
        response = await api.get(`/time/players/${partida.idTime2}`, config)
        const jogadoresTime2 = response.data.Jogadors
        
        console.log("Partidas",partida)
        console.log("JogadoresTime1",jogadoresTime1)
        console.log("JogadoresTime2",jogadoresTime2)
        res.render('jogos', { jsonPartida: JSON.stringify(partida), idPartida: partida.idPartida , jogadoresTime1, jogadoresTime2, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar datas.' });
        console.error(error)
    }
}
