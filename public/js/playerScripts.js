const url = "http://localhost:3001/";

//Funções do cadastro de Jogador

// Função de validação do formulário
function validateForm(formData) {
    const nomeJogador = formData.get('nomeJogador');
    const sobrenome = formData.get('sobrenome');
    const cpf = formData.get('cpf');
    const telefone = formData.get('telefone');
    const numeroCamiseta = formData.get('numeroCamiseta');


    if (!nomeJogador || !sobrenome || !cpf || !telefone || !numeroCamiseta) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false; // Impede o envio do formulário
    }

    if (numeroCamiseta < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ordem deve ser um número maior ou igual a 1!',
        });
        return false;
    }
}

//Evento quando o botão "Salvar" do formulário de cadastro de jogador é clicado
function CreateJogadorClick(event) {
    event.preventDefault(); //Evita que a página seja recarregada

    //Obtém os valores dos campos do formulário
    const formData = new FormData(document.querySelector("#createJogadorForm"));

    //Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {

        /*
        //busca o token armazenado no localStorage
        const token = localStorage.getItem('token');

        //Configura o cabeçalho com a autorização do token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }; */

        //Faz uma solicitação POST para criar o Jogador
        axios.post('api/jogador/', formData, config) //axios.post('api/jogador/', formData, config)
            .then(response => {
                //console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Jogador criado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = '/jogador/';
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao criar jogador!',
                    text: error.response.data.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }
}