const api = require('../config/api')

// Metodo para buscar todos os elementos da api
exports.getALLDatas = async (req,res) => {
    try {
        var partidas = {}, times = {}, jogadores = {}
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Fazer a requisição para a API
        let response = await api.get("/campeonato/status/Em%20Andamento,Aguardando", config)
        const campeonatos = response.data
        if (campeonatos.length != 0) {
            const idcamp = campeonatos[0].idCampeonato
            let cont = 0;
            campeonatos.forEach(function (element){
                if (cont == 0){
                    element.active = true
                    cont++
                } else{
                    element.active = false
                }
            })

            response = await api.get(`/partida/${idcamp}`, config)
            partidas = response.data
        }

        response = await api.get("/time/all", config)
        times = response.data

        response = await api.get("/jogador/all", config)
        jogadores = response.data
        const user = res.locals.user
        
        res.render('dashboard', { user, campeonatos, partidas, times, jogadores, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
        console.log("PainelWS Token: "+req.session.token)
    }
}