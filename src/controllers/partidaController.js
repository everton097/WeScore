const api = require('../config/api')
const apiUrl = "http://localhost:3001/"
const spaUrl = "http://localhost:3002/"

exports.getPartidaCampeonatoById = async (req, res) => {
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

        response = await api.get(`/ponto/last/${idPartida}`, config)
        const pontos = response.data
        response = await api.get(`/time/players/${partida.idTime1}`, config)
        const jogadoresTime1 = response.data
        response = await api.get(`/time/players/${partida.idTime2}`, config)
        const jogadoresTime2 = response.data
        response = await api.post(`/substituicao/all/${idPartida}`, { idSet: partida.setAtual }, config)
        const substituicao = response.data

        let substituicaoEsquerda = [];
        let substituicaoDireita = [];
        for (let i = 0; i < substituicao.length; i++) {
            const time = substituicao[i].idTime;
            const ladoQuadra = (time === partida.idTime1) ? pontos.ladoQuadraTime1 : (time === partida.idTime2) ? pontos.ladoQuadraTime2 : null;

            if (ladoQuadra === "Esquerda") {
                substituicaoEsquerda.push(substituicao[i]);
            } else if (ladoQuadra === "Direita") {
                substituicaoDireita.push(substituicao[i]);
            }
        }

        res.render('jogos', {
            idPartida: partida.idPartida,
            substituicaoEsquerda: JSON.stringify(substituicaoEsquerda),
            substituicaoDireita: JSON.stringify(substituicaoDireita),
            jsonPartida: JSON.stringify(partida),
            jogadoresTime1: JSON.stringify(jogadoresTime1),
            jogadoresTime2: JSON.stringify(jogadoresTime2),
            user, spaUrl, apiUrl, layout: 'painelws'
        })
        console.log("substituicaoEsquerda", substituicaoEsquerda);
        console.log("substituicaoDireita", substituicaoDireita);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar datas.' });
        console.error(error)
    }
}
