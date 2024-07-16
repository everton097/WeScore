function validateForm(formData) {
  const nomeJogador = formData.get("nomeJogador");
  const sobrenome = formData.get("sobrenome");
  const cpf = formData.get("cpf");
  const telefone = formData.get("telefone");
  const numeroCamiseta = formData.get("numeroCamiseta");
  const idTime = formData.get("idTime");

  // Validar campos preenchidos. Se algum campo estiver vazio, exibir mensagem de erro
  if (
    !nomeJogador ||
    !sobrenome ||
    !cpf ||
    !telefone ||
    !numeroCamiseta ||
    !idTime
  ) {
    // Exibir mensagem de erro para o usuário
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, preencha todos os campos obrigatórios!",
    });
    return false; // Impede o envio do formulário
  }

  return true; // Todos os campos estão preenchidos corretamente
}
// Função para obeter o IdUsuario Do Seu LocalStorage
function obterIdUsuarioLocalStorage() {
  return localStorage.getItem("userId");
}
// Ignorar preposição e partículas de ligação na capitalização de nomes
var ignorar = ["das", "dos", "e", "é", "do", "da", "de"];
// Função para capitalizar nomes (primeira letra de cada palavra em maiúscula)
function caixaAlta(string) {
  return String(string)
    .toLowerCase()
    .replace(/([^A-zÀ-ú]?)([A-zÀ-ú]+)/g, function (match, separator, word) {
      if (ignorar.indexOf(word) != -1) return separator + word;
      return separator + word.charAt(0).toUpperCase() + word.slice(1);
    });
}
// Seleciona o input do nome
const nome = document.getElementById("nome");
// Adiciona um ouvinte de evento para formatar o número de cpf
nome.addEventListener("input", function (event) {
  // Atualiza o valor do input com o nome formatado
  event.target.value = caixaAlta(event.target.value);
});

// Seleciona o input do sobrenome
const sobrenome = document.getElementById("sobrenome");
// Adiciona um ouvinte de evento para formatar o número de cpf
sobrenome.addEventListener("input", function (event) {
  // Atualiza o valor do input com o sobrenome formatado
  event.target.value = caixaAlta(event.target.value);
});

// Seleciona o input do cpf
const cpfInput = document.getElementById("cpf");
// Adiciona um ouvinte de evento para formatar o número de cpf
cpfInput.addEventListener("input", function (event) {
  // Obtém o valor atual do input
  let cpf = event.target.value;

  // Remove todos os caracteres não numéricos
  let cpfNumerico = cpf.replace(/\D/g, "");

  // Limita a entrada a 11 dígitos
  if (cpfNumerico.length > 11) {
    cpfNumerico = cpfNumerico.slice(0, 11);
  }

  // Formata o CPF conforme o número de dígitos inseridos
  let cpfFormatado;
  if (cpfNumerico.length <= 3) {
    cpfFormatado = cpfNumerico;
  } else if (cpfNumerico.length <= 6) {
    cpfFormatado = cpfNumerico.replace(/^(\d{3})(\d{0,3})$/, "$1.$2");
  } else if (cpfNumerico.length <= 9) {
    cpfFormatado = cpfNumerico.replace(/^(\d{3})(\d{3})(\d{0,3})$/, "$1.$2.$3");
  } else {
    cpfFormatado = cpfNumerico.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{0,2})$/,
      "$1.$2.$3-$4"
    );
  }
  // Atualiza o valor do input com o CPF formatado
  event.target.value = cpfFormatado;
});
// Seleciona o input do telefone
const telefoneInput = document.getElementById("telefone");
// Adiciona um ouvinte de evento para formatar o número de telefone
telefoneInput.addEventListener("input", function (event) {
  // Obtém o valor atual do input
  let telefone = event.target.value;
  var retorno = telefone.replace(/\D/g, "");
  retorno = retorno.replace(/^0/, "");
  if (retorno.length > 10) {
    retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (retorno.length > 5) {
    if (retorno.length == 6 && event.code == "Backspace") {
      // necessário pois senão o "-" fica sempre voltando ao dar backspace
      return;
    }
    retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (retorno.length > 2) {
    retorno = retorno.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    if (retorno.length != 0) {
      retorno = retorno.replace(/^(\d*)/, "($1");
    }
  }
  event.target.value = retorno;
});

// Função para remover caracteres especiais do número de telefone e cpf
function removerCaracteresEspeciais(element) {
  return element.replace(/\D/g, "");
}

// Evento quando o botão "Salvar" de criação é clicado
document.querySelector("#saveJogadorForm")
  .addEventListener("click", function () {
    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector("#editJogadorForm"));
    const idJogadorEdit = document.querySelector("#editJogadorForm").dataset.jogadorId
    formData.append(
      "idTime",
      document.querySelector("#editJogadorForm").dataset.timeId
    );
	  // Atualiza os valores de telefone e cpf no formData
    formData.set('telefone', removerCaracteresEspeciais(telefoneInput.value));
    formData.set('cpf', removerCaracteresEspeciais(cpfInput.value));

    // Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {
      // busca o token armazenado no login
      const token = localStorage.getItem("token");

      // Converter FormData para application/x-www-form-urlencoded
      const formParams = new URLSearchParams();
      formData.forEach((value, key) => {
        formParams.append(key, value);
      });

      // Configurar o cabeçalho com a autorização do token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      // Fazer uma solicitação POST para atualizar o jogador
      axios.put(`${url}jogador/${idJogadorEdit}`, formParams, config)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Jogador atualizado com sucesso",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Após o tempo definido (1500 ms), redirecione para a página cursos
          window.location.href = `/painelws/`;
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          const { data, status } = error.response;
          Swal.fire({
            icon: "error",
            title: `Error para atualizar o jogador.\n${data.error}`,
            text: `Erro ${status} ` || "Erro desconhecido",
          });
        } else if (error.request) {
          // A solicitação foi feita, mas não houve resposta do servidor
          console.error("Sem resposta do servidor");
        } else {
          // Algo aconteceu durante a configuração da solicitação que acionou um erro
          console.error("Erro na configuração da solicitação", error.message);
        }
      });
    }
  });
