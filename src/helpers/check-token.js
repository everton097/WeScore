const checkToken = (req, res, next) => {
    // Verifica se o token está presente na sessão
    if (!req.session || !req.session.token) {
        // redirecione para a página login
        return res.redirect('/login');
    }
  
    // Se o token estiver presente, continua para a próxima rota
    next();
  };

module.exports = checkToken;