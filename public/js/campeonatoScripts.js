const url = "http://localhost:3001/";

///     FUNÇÕES DO CADASTRO DE CAMPEONATOS  ///

// Evento quando o botão "Salvar" do formulário de edição é clicado
function CreateCampeonatoClick(event) {

    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#createCampeonatoForm'));


    // Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {

        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho com a autorizção do token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        // Fazer uma solicitação POST para criar o campeonato
        axios.post(`${url}api/campeonatos/`, formData, config)
            .then(response => {
                //console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Campeonato criado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página campeonatos
                    window.location.href = `../campeonatos/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });

    }
};

// Função de validação do formulário
function validateForm(formData) {
    const titulo = formData.get('titulo');
    const imagem = formData.get('imagem');
   

    if (!titulo || !imagem) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false; // Impede o envio do formulário
    }

        // Validar a imagem
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const imageExtension = imagem.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(`.${imageExtension}`)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A imagem deve ser um arquivo de imagem válido (jpg, jpeg, png, gif)!',
        });
        return false;
    }

    return true; // Todos os campos estão preenchidos corretamente
}


// Evento quando o botão "Salvar" do formulário de edição é clicado
function UpdateCampeonatoClick(event) {

    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editCampeonatoForm'));

    // Obter o ID do Campeonato a ser editado
    const campeonatoId = document.querySelector('#editCampeonatoId').value;

    // Chama a função de validação antes de enviar a solicitação PUT
    if (validateForm(formData)) {


        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho com a autorizção do token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        // Fazer uma solicitação PUT para atualizar o Campeonato
        axios.put(`${url}api/campeonatos/${campeonatoId}`, formData, config)
            .then(response => {
                //console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Dados gravados com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página desejada
                    window.location.href = `../campeonatos/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });

    }
};