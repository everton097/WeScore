// middleware para retornar os dados do usuario logado

const getUser = (req, res, next) => {
    res.locals.user = {
        userId: req.session.userId,
        userName: req.session.userName,
        userMail: req.session.userMail,
        userLogo: req.session.userLogo
    };

    // Chame next() para passar o controle para o próximo middleware ou rota
    next();
};
module.exports = getUser;