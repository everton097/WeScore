// middleware para validar token
const checkToken = (req, res, next) => {
    const token = localStorage.getItem('token');
    if (!token) { //Se não existe token, vai para o login
        window.location.href = `../login`;
    }
    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const url = "http://localhost:3001/";
    // Fazer uma solicitação POST para criar o usuario
    axios.get(`${url}usuario/checkUser/`, config)
        .then(response => {
            if (response.status != 200){
                window.location.href = `../login`;
            }
            console.log("CheckToken - Token Valido.");
        })
        .catch(error => {
            window.location.href = `../login`;
        });
}
module.exports = checkToken;