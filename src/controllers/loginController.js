// Recupera o Base URL da API
const dotenv  = require('dotenv')
const api = require('../config/api');

// Método para mostrar a página de login
exports.loginPage = async (req, res) => {
    try {
        // Renderiza a pagina
        res.render('login/')
        
    } catch (error) {
        console.log(`Erro ao renderiazar a HOME. ${error}`);
    }
}
// Função para autenticar o usuário
exports.autenticate = async (req, res) => {
    try {
        // Obtém os dados do usuário a partir do corpo da requisição
        const usuario = req.body;
    
        // Faz uma solicitação POST para fazer o login do usuário usando a API 
        api.post(`/usuario/token/`, usuario)
        .then(response => {
            console.log(response.data);
            // Armazena informações importantes da sessão do usuário no objeto 'req.session'
            req.session.token = response.data.token; // Armazena o token de autenticação
            req.session.userId = response.data.userId; // Armazena o ID do usuário
            req.session.userMail = response.data.userMail; // Armazena o email do usuário
    
            // Salva a sessão antes de responder à requisição
            req.session.save(() => {
                // Retorna uma resposta bem-sucedida com informações de autenticação
                res.status(200).json({
                    message: "Você está autenticado!",
                    token: req.session.token,
                    userMail: response.data.userId,
                    userId: response.data.userMail
                })
            })
        })
        .catch(error => {
            // Lida com erros de autenticação da API externa
            const mensagem = error.response.data.error;
            res.status(401).json({ error: mensagem });
            console.log(error)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor ao autenticar o usuario.' });
    }
}