const api = require('../config/api')

// Metodo para buscar todos os elementos da api

exports.getALLDatas = async (req,res) => {
    try {
        const apiUrl = "http://localhost:3001/"
        const spaUrl = "http://localhost:3002/"

        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Fazer a requisição para a API
        let response = await api.get("/campeonato/all", config)
        const campeonatos = response.data
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
        const user = res.locals.user
        res.render('campeonato/', { campeonatos, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}
exports.addCampeonato = async (req,res) => {
    const user = res.locals.user
    res.render('campeonato/add', { user,layout : 'painelws'})
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
        response = await api.get(`/partida/IDs/${idCampeonato}`, config)
        const idtimes = response.data.idtime
        console.log(idtimes);
        // Requisição para retorno dos times do usuário logado.
        response = await api.get(`/time/all/${user.userId}`, config)
        const todosTimes = response.data

        // Filtrar os times que não estão presentes nos IDs da partida
        const time = todosTimes.filter(time => !idtimes.includes(time.idTime));
        console.log(time);


        res.render('campeonato/timeAdd', { campeonato, time, user, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}