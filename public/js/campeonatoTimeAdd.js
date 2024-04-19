
console.log("entrou no campeonatoTimeAdd.js");// Função de validação do formulário
function validateForm(formData) {
    const name = formData.get('nomeTime');
    const file = formData.get('logoTime');

    // Validar campos preenchidos. Se algum campo estiver vazio, exibir mensagem de erro
    if (!name || !file) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false; // Impede o envio do formulário
    }

    // Validar a imagem. Se a extensão do arquivo não for uma imagem, exibir mensagem de erro
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const imageExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(`.${imageExtension}`)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A imagem deve ser um arquivo de imagem válido [jpg, jpeg, png, gif]!',
        });
        return false;
    }

    return true; // Todos os campos estão preenchidos corretamente
}
// Função para obeter o IdUsuario Do Seu LocalStorage
function obterIdUsuarioLocalStorage() {
    return localStorage.getItem('userId');
}
// Evento quando time é clicado
document.getElementById("timeSelectorContainer").addEventListener("click", async function (event) {
  // Obtenha o ID do campeonato clicado
  const timeId = event.target.closest(".timeselector").dataset.timeId;
  const timeElement = event.target.closest(".timeselector");

  // Verificar se a classe time_active está presente
  const isTimeActive = timeElement.classList.contains("time_active");
  // Adicionar ou remover a classe com base na verificação
  if (isTimeActive) {
    timeElement.classList.remove("time_active");
  } else {
    timeElement.classList.add("time_active");
  }
  // Obter formulário de novo time
  const formCadastroNovoTime = document.getElementById('cadrastroNovoTime');
  // Obter todos os elementos com a classe time_active
  const timeActiveElements = document.querySelectorAll('.time_active');
  // Verifica se tem algum time selecionado e impede a interação com o formulário de novo time
  timeActiveElements.length > 0 ?  formCadastroNovoTime.style.pointerEvents = 'none' : formCadastroNovoTime.style.pointerEvents = 'auto'
});

// Evento quando o botão "Salvar" de criação é clicado
document.querySelector('#saveCampeonatoForm').addEventListener('click', function () {
  //busca o token armazenado no login
  var token = localStorage.getItem("token");
  // Configurar o cabeçalho com a autorizção do token
  var config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  // Obtenha o ID do campeonato clicado
  const idCampeonato = document.getElementById("AdicionarTimeCamp").dataset.campeonatoId;
  // Obter todos os elementos com a classe time_active
  const timeActiveElements = document.querySelectorAll('.time_active');
  // Criar um array para armazenar os valores de dataset.timeId
  if (timeActiveElements.length>0) {
    const idTime = [];
    // Iterar sobre os elementos e recuperar os valores de dataset.timeId
    timeActiveElements.forEach((element) => {
      const timeId = element.dataset.timeId;
      idTime.push(timeId);
    });
    const keys ={
     idCampeonato: idCampeonato,
     idTimes: idTime
    }
    // Fazer uma solicitação POST para vincular um novo time
    axios.post(`${url}time_campeonato/enroll`, keys, config)
    .then(response => {            
        Swal.fire({
            icon: 'success',
            title: 'Time vinculado com sucesso',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // Após o tempo definido (1500 ms), redirecione para a página cursos
            window.location.href = `/painelws/`;
        });
    })
    .catch(error => {
        console.error(error);
        if (error.response) {
            const { data, status } = error.response;
            Swal.fire({
                icon: 'error',
                title: `${data.message}`,
                text: `Erro ${status} ` || 'Erro desconhecido',
            });
        } else if (error.request) {
            // A solicitação foi feita, mas não houve resposta do servidor
            console.error('Sem resposta do servidor');
        } else {
            // Algo aconteceu durante a configuração da solicitação que acionou um erro
            console.error('Erro na configuração da solicitação', error.message);
        }
    });

  } else {
    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector('#createCampeonatoForm'));
    // Adicionar o idUsuario ao formData aqui
    const idUsuario = obterIdUsuarioLocalStorage();
    formData.append('idUsuario', idUsuario);

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
    // Fazer uma solicitação POST para criar um novo banner
    axios.post(`${url}time/create`, formData, config)
        .then(response => {            
            Swal.fire({
                icon: 'success',
                title: 'Time criado com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
              console.log(response.data);
              console.log(response.data.idTime);
              const keys ={
                idCampeonato: idCampeonato,
                idTimes: response.data.idTime
              }
              console.log(keys);
              // Após o time ser cadastrado ele é vinculado ao campeonato atual e redireciona para o painelws
              axios.post(`${url}time_campeonato/enroll`, keys, config)
              .then(response => {            
                  Swal.fire({
                      icon: 'success',
                      title: 'Time vinculado com sucesso',
                      showConfirmButton: false,
                      timer: 1500
                  }).then(() => {
                      // Após o tempo definido (1500 ms), redirecione para a página cursos
                      window.location.href = `/painelws/`;
                  });
              })
              .catch(error => {
                  console.error(error);
                  if (error.response) {
                      const { data, status } = error.response;
                      Swal.fire({
                          icon: 'error',
                          title: `${data.message}`,
                          text: `Erro ${status} ` || 'Erro desconhecido',
                      });
                  } else if (error.request) {
                      // A solicitação foi feita, mas não houve resposta do servidor
                      console.error('Sem resposta do servidor');
                  } else {
                      // Algo aconteceu durante a configuração da solicitação que acionou um erro
                      console.error('Erro na configuração da solicitação', error.message);
                  }
              });
            });
        })
        .catch(error => {
            console.error(error);
            if (error.response) {
                const { data, status } = error.response;
                Swal.fire({
                    icon: 'error',
                    title: `${data.message}`,
                    text: `Erro ${status} ` || 'Erro desconhecido',
                });
            } else if (error.request) {
                // A solicitação foi feita, mas não houve resposta do servidor
                console.error('Sem resposta do servidor');
            } else {
                // Algo aconteceu durante a configuração da solicitação que acionou um erro
                console.error('Erro na configuração da solicitação', error.message);
            }
        });
    }
  }
});

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const imageExtension = file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(`.${imageExtension}`)) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A imagem deve ser um arquivo de imagem válido [jpg, jpeg, png, gif]!',
      });
      return false;
  }

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}


