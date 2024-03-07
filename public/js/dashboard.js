const url = "http://localhost:3001/";
// Exemplo de JavaScript para adicionar/remover a classe
var userImage = document.getElementById("user_img");
var userInput = document.getElementById("user_input");

// Adiciona um ouvinte de evento de clique à imagem do usuário
userImage.addEventListener("click", function () {
	// Verifica se o menu de opções está visível
	if (
		userInput.style.visibility === "hidden" ||
		userInput.style.visibility === ""
	) {
		userInput.style.visibility = "visible";
		userInput.style.opacity = "1";
		userInput.style.top = "48px";
	} else {
		userInput.style.visibility = "hidden";
		userInput.style.opacity = "0";
		userInput.style.top = "30px";
	}
});

var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function () {
	// Limpa dados do usuario do localStorage
	localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userMail');
    localStorage.removeItem('userLogo');
	// Redireciona para a página /logout
	window.location.href = "/logout";
});


// Adicione um ouvinte de evento para os itens de campeonato
document.getElementById("campeonatosContainer").addEventListener("click", async function (event) {
		// Obtenha o ID do campeonato clicado
		const campeonatoId = event.target.closest(".cardDashboard_division").dataset.campeonatoId;
		const campeonatoElement = event.target.closest(".cardDashboard_division");

		// Verifica se o clique foi no botão de Iniciar
		if (event.target.id === `start${campeonatoId}`) {
			try {
				// Fazer uma solicitação PUT para atualizar o status do campeonato para "Em Andamento"
				var token = localStorage.getItem("token");
				var config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				// Faça a requisição para alterar o status do campeonato
				await axios.put(`${url}campeonato/status/${campeonatoId}`, config);

				// Remover o botão de Iniciar
				const startButton = document.getElementById(`start${campeonatoId}`);
				if (startButton) {
					// Obtenha o pai do botão de Iniciar
					const parentElement = startButton.parentNode;
					// Remova o botão de Iniciar
					startButton.parentNode.removeChild(startButton);

					// Crie e adicione o botão de Finalizar
					const finishButton = document.createElement("a");
					finishButton.id = `finish${campeonatoId}`;
					finishButton.innerHTML = '<i class="ri-stop-line"></i>Finalizar';
					finishButton.addEventListener("click", function () {
						// Adicione a lógica para o botão de Finalizar, se necessário
						console.log("Botão de Finalizar clicado");
					});
					// Adicione o botão de Finalizar antes do botão de Remover
					parentElement.insertBefore(
						finishButton,
						parentElement.querySelector(`#del${campeonatoId}`)
					);
				}

				const statusAguardando = document.querySelector(`#status${campeonatoId}`);
				if (statusAguardando) {
					// Obtenha o pai do status
					const parentElementStatus = statusAguardando.parentNode;
					// Remova o status
					statusAguardando.parentNode.removeChild(statusAguardando);
					// Crie e adicione o botão de Finalizar
					const finishStatus = document.createElement("span");
					// Verifica se a página ativa é a página de painelws para adicionar a tooltip para o status do campeonato
					if (activePage === '/painelws') {
						finishStatus.id = `status${campeonatoId}`;
						finishStatus.classList.add("cardDashboard_division_status_min");
						finishStatus.classList.add("cardDashboard_division_status_andamento");
						finishStatus.innerHTML = "";
						const tooltipAguardando = document.querySelector(`#tooltip${campeonatoId}`);
						tooltipAguardando.parentNode.removeChild(tooltipAguardando);
						const tooltipstatus = document.createElement("span");
						tooltipstatus.id = `tooltip${campeonatoId}`;
						tooltipstatus.classList.add("tooltip");
						tooltipstatus.classList.add("cardDashboard_division_status_andamento");
						tooltipstatus.innerHTML = "Em Andamento";
						parentElementStatus.appendChild(tooltipstatus);
					}else{
						finishStatus.id = `status${campeonatoId}`;
						finishStatus.classList.add("cardDashboard_division_status");
						finishStatus.classList.add("cardDashboard_division_status_andamento");
						finishStatus.innerHTML = "Em Andamento";
					}
					// Adicione o status
					parentElementStatus.appendChild(finishStatus);
				}
			} catch (error) {
				console.error(error);
			}
		}
		// Verifica se o clique foi no botão de Deletar
		else if (event.target.id === `del${campeonatoId}`) {
			console.log("Botão remover clicado");
			// Fazer uma solicitação PUT para atualizar o status do campeonato para "Em Andamento"
			
			Swal.fire({
				title: "Tem certeza?",
				text: "Você não poderá reverter essa ação!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Sim, remova-o!"
			  }).then((result) => {
				if (result.isConfirmed) {
					delCampeonato(campeonatoElement, campeonatoId).then((response) => {
						Swal.fire({
							icon: 'success',
							title: 'Campeonato removido com sucesso',
							showConfirmButton: false,
							showConfirmButton: false,
							timer: 1500,
						});
						return false;
					})
				}
			  });
		}

		// Verifica se o clique foi em um item de campeonato (excluindo botões de opções),
		// para remover a classe campeonato_active e renderizar as partidas
		const campeonatoDivision = event.target.closest(".cardDashboard_division");
		if (campeonatoDivision && !event.target.closest(".dropdown-content")) {
			// Remova a classe campeonato_active do campeonato antigo
			const campeonatoAtivo = document.querySelector(".campeonato_active");
			if (campeonatoAtivo) {
				campeonatoAtivo.classList.remove("campeonato_active");
			}
			// Adicione a classe campeonato_active ao campeonato clicado
			campeonatoElement.classList.add("campeonato_active");

			//busca o token armazenado no login
			var token = localStorage.getItem("token");

			// Configurar o cabeçalho com a autorizção do token
			var config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			// Fazer uma solicitação GET para buscar as partidas do campeonato clicado
			axios.get(`${url}partida/${campeonatoId}`, config)
				.then((response) => {
					// Renderiza as partidas no contêiner de partidas
					const partidasContainer = document.getElementById("partidasContainer");
					partidasContainer.innerHTML = ""; // Limpe o conteúdo anterior
					// Se não houverem partidas, mostre mensagem informativa
					if (response.data.length === 0) {
						const noPartidaMessage = document.createElement("p");
						noPartidaMessage.innerHTML = "Nenhuma Partida disponível.";
						partidasContainer.appendChild(noPartidaMessage);
					} else {
						response.data.forEach((partida) => {
							const partidaElement = document.createElement("div");
							partidaElement.id = `partida_${partida.idPartida}`;
							partidaElement.classList.add("cardDashboard_division");
							// Busca o HTML dos botoes baseado no status
							const anchorsHTML = getAnchorsHTML(partida.status, partida.idPartida, campeonatoId);

							partidaElement.innerHTML = `
							  <div class="cardDashboard_division_image"></div>
							  <div class="cardDashboard_division_content">
								<div class="cardDashboard_division_text">
								  <span class="cardDashboard_division_name">Partida: ${partida.rodada}</span>
								  <p class="cardDashboard_division_username">${partida.nomeTime1} vs ${partida.nomeTime2}</p>
								</div>

								<div class="paste-button">
										<button class="painelws_Btn">
											<i class="ri-more-2-fill"></i>
											<div class="painelws_Btn_text">Opções</div>
										</button>
										<div class="dropdown-content">
											<a id="editPartida${partida.idPartida}" href="/painelws/campeonato/${partida.idPartida}"><i class="ri-pencil-line"></i>Editar</a>
											
											${anchorsHTML}
											
											<a id="delPartida${partida.idPartida}" href="#"><i class="ri-delete-bin-line"></i>Remover</a>
										</div>
								</div>

							  </div>
							`;
							partidasContainer.appendChild(partidaElement);

							// Adiciona o ouvinte de evento para o botão de "Iniciar"
							const startButton = partidaElement.querySelector(`#startPartida${partida.idPartida}`);
							if (startButton) {
								startButton.addEventListener("click", async () => {
									try {
										
										// Faça a requisição para alterar o status da partida para "Em Andamento"
										const idPartida = partida.idPartida
										axios.get(`${url}partida/status/${idPartida}`, config)
										.then((response) => {
											// Remova o botão de Iniciar da partida
											const startButtonPartida = document.getElementById(`startPartida${idPartida}`);
											if (startButtonPartida) {
												// Obtenha o pai do botão de Iniciar
												const parentElement = startButtonPartida.parentNode;
												// Remova o botão de Iniciar
												startButtonPartida.parentNode.removeChild(startButtonPartida);

												// Crie e adicione o botão de Finalizar
												const turnBackPartida = document.createElement("a");
												turnBackPartida.id = `turnBackPartida${idPartida}`;
												turnBackPartida.href = `/painelws/partida/${idPartida}`;
												turnBackPartida.innerHTML = '<i class="ri-arrow-turn-back-line"></i></i>Retomar</a>';
												turnBackPartida.addEventListener("click", function () {
													console.log("Botão de turnBack clicado");
												});
												// Adicione o botão de Finalizar antes do botão de Remover
												parentElement.insertBefore(
													turnBackPartida,
													parentElement.querySelector(`#delPartida${idPartida}`)
												);
											}
											window.location.href = `/painelws/partida/${idPartida}`;
										})
									} catch (error) {
										console.error(error);
									}
								});
							}
						});
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
});

// Função para obter o HTML das âncoras com base no status
function getAnchorsHTML(status, idPartida, campeonatoId) {
	if (status === "Aguardando") {
		return `
			<a id="startPartida${idPartida}"><i class="ri-play-line"></i>Iniciar</a>
		`;
	} else if (status === "Em Andamento") {
		return `
			<a id="turnBackPartida${idPartida}" href="/painelws/partida/${idPartida}"><i class="ri-arrow-turn-back-line"></i></i>Retomar</a>
		`;
	}/*  else {
		return `
			<a id="del">
			<i class="ri-delete-bin-line"></i>Remover
			</a>
		`;
	} */
}
// Função para requisição para remover o campeonato
async function delCampeonato(campeonatoElement,campeonatoId) {
	var token = localStorage.getItem("token");
				var config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
	await axios.delete(`${url}campeonato/${campeonatoId}`, config)
	.then((response) => {
		// Remover o campeonato
		campeonatoElement.parentNode.removeChild(campeonatoElement);
	})
	.catch((error) => {
		console.error(error);
	});
};
// ouvinte para elemesntos com ID partidasContainer
document.getElementById("partidasContainer").addEventListener("click", async function (event) {
	const parentElement = event.target.parentNode;
	// Verifique se o clique foi em um botão dentro do contêiner de partidas
	if (parentElement.classList.contains("dropdown-content")) {
        // Obtenha a referência ao botão clicado
        const button = event.target;
		
        // Obtenha o ID da partida associado a este botão
        const partidaId = button.closest(".cardDashboard_division").id.replace("partida_", "");
        // Realize a lógica relacionada ao botão aqui
        if (button.id.startsWith("startPartida")) {
            // Lógica para o botão Iniciar
            console.log(`Botão Iniciar clicado para a partida ${partidaId}`);
            // Faça sua requisição axios para iniciar a partida
        } else if (button.id.startsWith("turnBackPartida")) {
            // Lógica para o botão Retomar
            console.log(`Botão Retomar clicado para a partida ${partidaId}`);
            // Faça sua requisição axios para retomar a partida
        }
	}
})