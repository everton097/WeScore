function validateForm(formData) {
	const qtdeSets = formData.get("qtdeSets");

	// Validar campos preenchidos. Se algum campo estiver vazio, exibir mensagem de erro
	if (!qtdeSets) {
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

// Controle de estado para armazenar os IDs dos times selecionados
let selectedTimes = [];

// Evento quando time é clicado
document.getElementById("timeSelectorContainer").addEventListener("click", async function (event) {
		// Obtenha o ID do time clicado
		const timeId = event.target.closest(".timeselector").dataset.timeId;
		const timeElement = event.target.closest(".timeselector");

		// Verificar se a classe time_active está presente
		const isTimeActive = timeElement.classList.contains("time_active");

		// Verificar se o time clicado já está na lista de times selecionados
		const isSelected = selectedTimes.includes(timeId);
		// Verificar se o usuário está tentando selecionar um terceiro time
		if (selectedTimes.length >= 2 && !isSelected) {
			// Exibir mensagem de erro
			Swal.fire({
				icon: "error",
				title: `Você já selecionou dois times`,
				text: `Não é possível selecionar mais.`,
				timer: 1500,
			});
			return;
		}

		// Adicionar ou remover o time da lista de times selecionados
		if (isTimeActive && isSelected) {
			let partidaContainer;
			const defaultTime = `<div class="timeselector_image"></div>
                            <div class="timeselector_content">
                                <div class="timeselector_name">
                                    <p class="timeselector_nameTime">Escolha um time</p>
                                </div>
                            </div>`;

			// Renderizar os times selecionados no grupo de partidas
			partidaContainer = document.getElementById(`TimesNewPartida${timeId}`);
			// Limpar o conteúdo do grupo de partidas
			partidaContainer.innerHTML = defaultTime;
			// Adiciona o id Default para time não selecionado
			partidaContainer.id = `TimesNewPartida0`;
			// Remover o time da lista de times selecionados
			selectedTimes = selectedTimes.filter((id) => id !== timeId);
			timeElement.classList.remove("time_active");
		} else if (!isTimeActive && !isSelected) {
			// Adicionar o time à lista de times selecionados
			selectedTimes.push(timeId);
			timeElement.classList.add("time_active");
			let partidaContainer;
			if (selectedTimes.length == 1) {
				// Renderizar os times selecionados no grupo de partidas
				partidaContainer = document.getElementById("TimesNewPartida0");
				partidaContainer.id = `TimesNewPartida${timeId}`;
				partidaContainer.dataset.timeId = timeId;
				// Limpar o conteúdo do grupo de partidas
				partidaContainer.innerHTML = "";
			} else {
				// Renderizar os times selecionados no grupo de partidas
				partidaContainer = document.getElementById("TimesNewPartida0");
				partidaContainer.id = `TimesNewPartida${timeId}`;
				partidaContainer.dataset.timeId = timeId;
				// Limpar o conteúdo do grupo de partidas
				partidaContainer.innerHTML = "";
			}

			// Adicionar os times selecionados ao grupo de partidas
			const time = document.querySelector(
				`.timeselector[data-time-id="${timeId}"]`
			);
			const clone = time.cloneNode(true);
			// Obter apenas as divs internas do clone com as classes timeselector_image e timeselector_content
			const innerDivs = clone.querySelectorAll(
				".timeselector_image, .timeselector_content"
			);
			// Limpar o conteúdo do container antes de adicionar as divs internas
			partidaContainer.innerHTML = "";

			// Adicionar as divs internas ao container de partida
			innerDivs.forEach((div) => {
				partidaContainer.appendChild(div.cloneNode(true));
			});
		}
});

// Evento quando o botão "Salvar" de criação é clicado
document.querySelector("#savePartidaForm").addEventListener("click", function () {
		//busca o token armazenado no login
		var token = localStorage.getItem("token");
		// Configurar o cabeçalho com a autorizção do token
		var config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		// Obtenha o ID do campeonato clicado
		const idCampeonato =
			document.getElementById("AdicionarTimeCamp").dataset.campeonatoId;
		// Obter todos os elementos com a classe time_active
		const timeActiveElements = document.querySelectorAll(".time_active");
		// Obter os dados do formulário de criação
		const formData = new FormData(document.querySelector("#createPartidaForm"));
		if ((selectedTimes.length = 2)) {
			const keys = {
				idTime1: selectedTimes[0],
				idTime2: selectedTimes[1],
				qtdeSets: formData.get("qtdeSets"),
				idCampeonato: idCampeonato,
			};
			// Fazer uma solicitação POST para vincular um novo time
			axios
				.post(`${url}partida/create`, keys, config)
				.then((response) => {
					Swal.fire({
						icon: "success",
						title: "Partida criada com sucesso",
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
							title: `${data.error}`,
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
