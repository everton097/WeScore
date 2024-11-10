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
        res.render('campeonato/', { campeonatos, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}
exports.addCampeonato = async (req,res) => {
    const user = res.locals.user
    res.render('campeonato/add', { user, spaUrl, apiUrl, layout : 'painelws'})
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
        res.render('campeonato/timeAdd', { campeonato, time, user, spaUrl, apiUrl, layout : 'painelws' })
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
        // Requisição para retorno dos times do usuário logado.
        response = await api.get(`/time/all/${user.userId}`, config)
        const todosTimes = response.data
        // Requisição para retorno dos IDs times vinculado ao campeonato.
        response = await api.get(`/time_campeonato/${idCampeonato}`, config)
        const idtimes = response.data.idtime

        // Requisição para retorno dos IDs times das partidas do campeonato.
        response = await api.get(`/partida/IDs/${idCampeonato}`, config)
        const partidasIDtimes = response.data.idtime
        
        // Filtrar os times que não estão presentes nos IDs da partida
        const timelist = todosTimes.filter(time => idtimes.includes(time.idTime));

        /* // Filtrar os times que estão presentes em partida
        const time = timelist.filter(time => !partidasIDtimes.includes(time.idTime)); */
        const time = timelist

        res.render('campeonato/partidaAdd', { campeonato, time, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}
exports.partidaEditCampeonato = async (req,res) => {
    try {
        const user = res.locals.user
        const { idCampeonato,idpartida } = req.params;
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Requisição para retorno da partida a ser editada.
        let response = await api.get(`/partida/${idpartida}`, config)
        const partida = response.data
        // Requisição para retorno do campeonato a ser inserido a Partida.
        response = await api.get(`/campeonato/${idCampeonato}`, config)
        const campeonato = response.data
        // Requisição para retorno dos times do usuário logado.
        response = await api.get(`/time/all/${user.userId}`, config)
        const todosTimes = response.data
        // Requisição para retorno dos IDs times vinculado ao campeonato.
        response = await api.get(`/time_campeonato/${idCampeonato}`, config)
        const idtimes = response.data.idtime

        // Requisição para retorno dos IDs times das partidas do campeonato.
        response = await api.get(`/partida/IDs/${idCampeonato}`, config)
        const partidasIDtimes = response.data.idtime
        
        // Filtrar os times que não estão presentes nos IDs da partida
        const timelist = todosTimes.filter(time => idtimes.includes(time.idTime));

        /* // Filtrar os times que estão presentes em partida
        const time = timelist.filter(time => !partidasIDtimes.includes(time.idTime)); */
        const time = timelist
        if (time.length != 0) {
            let cont = 0;
            time.forEach(function (element){
                if (element.idTime == partida.idTime1 || element.idTime == partida.idTime2){
                    element.active = true
                    cont++
                } else{
                    element.active = false
                }
            })
        }

        res.render('campeonato/partidaEdit', { campeonato, partida, time, user, spaUrl, apiUrl, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}
exports.editTime = async (req,res) => {
    const user = res.locals.user
    const { idTime } = req.params;
    // Configurar o cabeçalho com a autorização do token
    const token = await req.session.token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    // Requisição para retorno da partida a ser editada.
    let response = await api.get(`/time/${idTime}`, config)
    const time = response.data[0]
    res.render('time/edit', { time, user, spaUrl, apiUrl, layout : 'painelws'})
}
exports.jogadorTimeAddByID = async (req,res) => {
    const user = res.locals.user
    const { idTime } = req.params;
    // Configurar o cabeçalho com a autorização do token
    const token = await req.session.token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    // Requisição para retorno de jogadores sem time.
    let response = await api.get(`/jogador/nolink`, config)
    const jogador = response.data
    res.render('jogador/add', { jogador,idTime, user, spaUrl, apiUrl, layout : 'painelws'})
}