// controllers/campeonatoController.js

const api = require('../config/api');


// Método para criar um novo campeonato
exports.createCampeonato =  async (req, res) => {
    try {
      // Renderiza a página campeonato/create.handlebars
      res.render('campeonato/create');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao mostrar formulário de criação de campeonatos' });
    }
  };

  
  // Método para buscar todos os campeonatos
  exports.getAllCampeonatos = async (req, res) => {
    try {
  
      // Configurar o cabeçalho com a autorização do token
      /*OBSERVAÇÃO: A nossa API não exige token nas operações de consulta,
      deste modo a configuração do cabeçalho abaixo é opcional. 
      Eu coloquei esta configuração para que se um dia vocês precisarem enviar o token para a API o código é este.
      Inicialmente busca o token da sessão e envia no cabeçalho da requisição. 
      const token = req.session.token;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      };
      */
      // Configurar o cabeçalho com a autorização do token
      const token = await req.session.token
      console.log("Toekn getALLDatas: "+token)
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      }
  
      // Faz uma solicitação GET para a API que fornece os banners
      const response = await api.get(`/campeonato/all`); //... ,config);
  
      // Obtenha os dados JSON da resposta
      const campeonatos = response.data;
  
      // Renderiza a página banner/index.handlebars e passa os banners como contexto
      res.render('campeonato/', { campeonatos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar campeonatos' });
    }
  };


    // Método para buscar campeonato para edição
exports.updateCampeonato = async (req, res) => {
  try {
    const { idCampeonato } = req.params;
    // Faz uma solicitação GET para a API que fornece o compeonato
    const response = await api.get(`/campeonato/${idCampeonato}`);

    // Obtenha os dados JSON da resposta
    const campeonato = response.data;

    // Renderiza a página campeonato/edit.handlebars e passa o campeonato como contexto
    res.render('campeonato/edit', { campeonato });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar campeonato' });
  }
};