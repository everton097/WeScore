
console.log("entrou no campeonatoTimeAdd.js");// Função de validação do formulário
function validateForm(formData) {
    const name = formData.get('nomeCampeonato');
    const file = formData.get('logoCampeonato');

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


  /* // Fazer uma solicitação POST para criar um novo banner
  axios.post(`${url}campeonato/create`, formData, config)
  .then(response => {            
      Swal.fire({
          icon: 'success',
          title: 'Campeonato criado com sucesso',
          showConfirmButton: false,
          timer: 1500
      }).then(() => {
          // Após o tempo definido (1500 ms), redirecione para a página cursos
          window.location.href = `../campeonato/`;
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
  }); */
});

// Evento quando o botão "Salvar" de criação é clicado
document.querySelector('#saveCampeonatoForm').addEventListener('click', function () {
  // Obter todos os elementos com a classe time_active
  const timeActiveElements = document.querySelectorAll('.time_active');
  // Criar um array para armazenar os valores de dataset.timeId
  const timeIds = [];
  // Iterar sobre os elementos e recuperar os valores de dataset.timeId
  timeActiveElements.forEach((element) => {
    const timeId = element.dataset.timeId;
    timeIds.push(timeId);
  });

  console.log(timeIds);
 
/*   // Fazer uma solicitação POST para criar um novo banner
  axios.post(`${url}campeonato/create`, formData, config)
  .then(response => {            
      Swal.fire({
          icon: 'success',
          title: 'Campeonato criado com sucesso',
          showConfirmButton: false,
          timer: 1500
      }).then(() => {
          // Após o tempo definido (1500 ms), redirecione para a página cursos
          window.location.href = `../campeonato/`;
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
  }); */

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


