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

document.getElementById("buttonTimeAdd").addEventListener("click", async function (event) {
	// Impede o comportamento padrão do link
    event.preventDefault();
	// Obtenha o ID do campeonato clicado
	const buttonTimeAddId = this.dataset.campeonatoId;
	if (buttonTimeAddId == 0) {
		Swal.fire({
            icon: 'error',
            title: 'Oops...',
			html: `
			<div>Nenhum <strong>campeonato</strong> selecionado!</div>
			<div>Adicione um campeonato para incluir <strong>time</strong>.</div>
		`,
        });
        return false;
	}else{
		window.location.href = this.href
	}}
);
document.getElementById("buttonPartidaAdd").addEventListener("click", async function (event) {
	// Impede o comportamento padrão do link
    event.preventDefault();
	// Obtenha o ID do campeonato clicado
	const buttonPartidaAddId = this.dataset.campeonatoId;
	if (buttonPartidaAddId == 0) {
		Swal.fire({
            icon: 'error',
            title: 'Oops...',
			html: `
			<div>Nenhum <strong>campeonato</strong> selecionado!</div>
			<div>Adicione um campeonato para incluir uma <strong>partida</strong>.</div>
		`,
        });
        return false;
	}else{
		window.location.href = this.href
	}}
);
document.getElementById("buttonJogadorAdd").addEventListener("click", async function (event) {
	// Impede o comportamento padrão do link
    event.preventDefault();
	// Obtenha o ID do campeonato clicado
	const buttonJogadorAddId = this.dataset.timeId;
	if (buttonJogadorAddId == 0) {
		Swal.fire({
            icon: 'error',
            title: 'Oops...',html: `
			<div>Nenhum <strong>time</strong> selecionado!</div>
			<div>Adicione um time para incluir <strong>jogador</strong>.</div>
		`,
        });
        return false;
	}else{
		window.location.href = this.href
	}}
);
// Adicione um ouvinte de evento para os itens de campeonato, renderizado pelo handlebars
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
			// Fazer uma solicitação PUT para atualizar o status do campeonato para "Em Andamento"
			Swal.fire({
				title: "Tem certeza?",
				text: "Você não poderá reverter essa ação!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Sim, remova!"
			  }).then((result) => {
				if (result.isConfirmed) {
					delCampeonato(campeonatoElement, campeonatoId).then((response) => {
						Swal.fire({
							icon: 'success',
							title: 'Campeonato removido com sucesso',
							showConfirmButton: false,
							showConfirmButton: false,
							timer: 1500,
						}).then(() => {
							// Redireciona para a página inicial do cms após o tempo definido
							window.location.href = `/painelws`;
						});
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
			// Obtém uma referência ao elemento
			const timeLinkElement = document.getElementById("buttonTimeAdd");
			const partidaLinkElement = document.getElementById("buttonPartidaAdd");

			// Modifica o atributo href
			timeLinkElement.href = `/painelws/campeonato/${campeonatoId}/time/add`;
			timeLinkElement.dataset.campeonatoId = campeonatoId;
			partidaLinkElement.href = `/painelws/campeonato/${campeonatoId}/partida/add`;
			partidaLinkElement.dataset.campeonatoId = campeonatoId;

			//busca o token armazenado no login
			var token = localStorage.getItem("token");

			// Configurar o cabeçalho com a autorizção do token
			var config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			// Fazer uma solicitação GET para buscar as partidas do campeonato clicado
			axios.get(`${url}partida/get/${campeonatoId}`, config)
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
											<a id="editPartida${partida.idPartida}" href="/painelws/campeonato/${campeonatoId}/partida/${partida.idPartida}/edit"><i class="ri-pencil-line"></i>Editar</a>
											
											${anchorsHTML}
											
											<a id="delPartida${partida.idPartida}" href="#"><i class="ri-delete-bin-line"></i>Remover</a>
										</div>
								</div>

							  </div>
							`;
							partidasContainer.appendChild(partidaElement);
						});
						// Adicione ouvintes de eventos após renderizar os elementos
						addEventListenersToPartidasContainer();
					}
				})
				.catch((error) => {
					console.error(error);
				});

				// Faça a requisição para pegar os ids dos times do campeonato clicado
				axios.get(`${url}time_campeonato/${campeonatoId}`, config)
				.then((response) => {
					const idtimes = response.data.idtime;
					// Se não houverem times, mostre mensagem informativa
					if (!response.data.idtime || response.data.idtime.length === 0) {
						// Renderiza as partidas no contêiner de partidas
						const timesContainer = document.getElementById("timesContainer");
						timesContainer.innerHTML = ""; // Limpe o conteúdo anterior
						const noPartidaMessage = document.createElement("p");
						noPartidaMessage.innerHTML = "Nenhum time disponível.";
						timesContainer.appendChild(noPartidaMessage);
						// Obtém uma referência ao elemento
						const jogadorLinkElement = document.getElementById("buttonJogadorAdd");
						// Modifica o atributo href
						jogadorLinkElement.href = ``;
						// Renderiza aviso de 'nenhum jogadore' no contêiner de jogadores
						const jogadoresContainer = document.getElementById("jogadoresContainer");
						jogadoresContainer.innerHTML = ""; // Limpe o conteúdo anterior
						const nojogadoreMessage = document.createElement("p");
						nojogadoreMessage.innerHTML = "Nenhum jogador disponível.";
						const nojogadoreMessage2 = document.createElement("p");
						nojogadoreMessage2.innerHTML = "Adicione um time para incluir jogador.";
						jogadoresContainer.appendChild(nojogadoreMessage);
						jogadoresContainer.appendChild(nojogadoreMessage2);
					}else{
						const idtimes = response.data.idtime
						// Fazer uma solicitação GET para buscar os times do campeonato clicado
						axios.get(`${url}time/${idtimes}`, config)
						.then((response) => {
							// Renderiza as partidas no contêiner de partidas
							const timesContainer = document.getElementById("timesContainer");
							timesContainer.innerHTML = ""; // Limpe o conteúdo anterior
							var cont = 0;
							response.data.forEach((time) => {
								if (cont == 0){
									time.active = true
									cont++
								} else{
									time.active = false
								}
								const timeElement = document.createElement("div");
								timeElement.id = `time_${time.idTime}`;
								if (time.active) {
									timeElement.classList.add("cardDashboard_division");
									timeElement.classList.add("time_active");
									timeElement.setAttribute("aria-current", "true");
									timeElement.dataset.timeId = time.idTime;
								} else {
									timeElement.classList.add("cardDashboard_division");
									timeElement.setAttribute("aria-current", "true");
									timeElement.dataset.timeId = time.idTime;
								}
								timeElement.innerHTML = `
									<div class="cardDashboard_division_image">
										<img
											src="http://localhost:3001/public/upload/img/time/${time.logoTime}"
											alt="logo do time"
										/>
									</div>
									<div class="cardDashboard_division_content">
										<div class="cardDashboard_division_text">
											<span class="cardDashboard_division_name">${time.nomeTime}</span>
											<p class="cardDashboard_division_username">ID time: ${time.idTime}</p>
										</div>
		
										<div class="paste-button">
												<button class="painelws_Btn">
													<i class="ri-more-2-fill"></i>
													<div class="painelws_Btn_text">Opções</div>
												</button>
												<div class="dropdown-content">
													<a id="editTime${time.idTime}" href="/painelws/time/${time.idTime}/edit"><i class="ri-pencil-line"></i>Editar</a>
													<a id="delTime${time.idTime}" ><i class="ri-delete-bin-line"></i>Remover</a>
												</div>
										</div>
									</div>
								`;
								timesContainer.appendChild(timeElement);
							});
							// Adiciona ouvintes de eventos após renderizar os elementos
							addEventListenersToTimesContainer();
							renderJogadores(response.data[0].idTime);
						}).catch((error) => {
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
				}).catch((error) => {
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
// ouvinte para elementos com ID partidasContainer, renderizado pelo handlebars
addEventListenersToPartidasContainer();
// Adicione um ouvinte de evento para os itens de times, renderizado pelo handlebars
document.getElementById("timesContainer").addEventListener("click", async function (event) {
	// Obtenha o ID do campeonato clicado
	const timeId = event.target.closest(".cardDashboard_division").dataset.timeId;
	const timeElement = event.target.closest(".cardDashboard_division");
	
	// Verifica se o clique foi no botão de Deletar
	if (event.target.id === `delTime${timeId}`) {
		// Fazer uma solicitação PUT para atualizar o status do time para "Em Andamento"
		Swal.fire({
			title: "Tem certeza?",
			text: "Você não poderá reverter essa ação!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sim, remova!"
		  }).then((result) => {
			if (result.isConfirmed) {
				delTime(timeElement, timeId).then((response) => {
				})
			}
		  }).catch((error) => {
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

	// Verifica se o clique foi em um item de campeonato (excluindo botões de opções),
	// para remover a classe time_active e renderizar as partidas
	const timeDivision = event.target.closest(".cardDashboard_division");
	if (timeDivision && !event.target.closest(".dropdown-content")) {
		// Remova a classe time_active do campeonato antigo
		const timeAtivo = document.querySelector(".time_active");
		if (timeAtivo) {
			timeAtivo.classList.remove("time_active");
		}
		// Adicione a classe time_active ao campeonato clicado
		timeElement.classList.add("time_active");
		const jogadorLinkElement = document.getElementById("buttonJogadorAdd");

		// Modifica o atributo href
		jogadorLinkElement.href = `/painelws/time/${timeId}/jogador/add`;
		jogadorLinkElement.dataset.timeId=timeId;

		renderJogadores(timeId);
	}

});
// Adicione um ouvinte de evento para os jogadores, renderizado pelo handlebars
document.getElementById("jogadoresContainer").addEventListener("click", async function (event) {
	// Obtenha o ID do jogador clicado
	const jogadorId = event.target.closest(".cardDashboard_division").dataset.jogadorId;
	const jogadorElement = event.target.closest(".cardDashboard_division");
	const jogadorTimeID = document.getElementById("buttonJogadorAdd").dataset.timeId;
	console.log(jogadorTimeID);
	// Verifica se o clique foi no botão de Deletar
	if (event.target.id === `delJogador${jogadorId}`) {
		// Fazer uma solicitação PUT para atualizar o status do jogador para "Em Andamento"
		Swal.fire({
			title: "Tem certeza?",
			text: "Você não poderá reverter essa ação!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sim, remova!"
		  }).then((result) => {
			if (result.isConfirmed) {
				deljogador(jogadorElement, jogadorId, jogadorTimeID).then((response) => {
					Swal.fire({
						icon: 'success',
						title: 'Jogador removido com sucesso',
						showConfirmButton: false,
						showConfirmButton: false,
						timer: 1500,
					});
					window.location.href = `/painelws/`;
					return false;
				})
			}
		  }).catch((error) => {
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
// Função para adicionar ouvintes de eventos ao partidasContainer, renderizado pelo JS - Front
function addEventListenersToPartidasContainer(){
	document.getElementById("partidasContainer").addEventListener("click", async function (event) {
		const parentElement = event.target.parentNode;
		// Verifique se o clique foi em um botão dentro do contêiner de partidas
		if (parentElement.classList.contains("dropdown-content")) {
			// Obtenha a referência ao botão clicado
			const button = event.target;
			
			// Obtenha o ID da partida associado a este botão
			const partidaId = button.closest(".cardDashboard_division").id.replace("partida_", "");
			if (button.id === `startPartida${partidaId}`) {
				// Busca o token armazenado no login
				var token = localStorage.getItem("token");
	
				// Configurar o cabeçalho com a autorizção do token
				var config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				try {
					// Faça a requisição para alterar o status da partida para "Em Andamento"
					axios.get(`${url}partida/status/${partidaId}`, config)
					.then((response) => {
						// Remova o botão de Iniciar da partida
						const startButtonPartida = document.getElementById(`startPartida${partidaId}`);
						if (startButtonPartida) {
							// Obtenha o pai do botão de Iniciar
							const parentElement = startButtonPartida.parentNode;
							// Remova o botão de Iniciar
							startButtonPartida.parentNode.removeChild(startButtonPartida);
	
							// Crie e adicione o botão de Finalizar
							const turnBackPartida = document.createElement("a");
							turnBackPartida.id = `turnBackPartida${partidaId}`;
							turnBackPartida.href = `/painelws/partida/${partidaId}`;
							turnBackPartida.innerHTML = '<i class="ri-arrow-turn-back-line"></i></i>Retomar</a>';
							// Adicione o botão de Finalizar antes do botão de Remover
							parentElement.insertBefore(
								turnBackPartida,
								parentElement.querySelector(`#delPartida${partidaId}`)
							);
						}
						window.location.href = `/painelws/partida/${partidaId}`;
					})
				} catch (error) {
					console.error(error);
				}
			} else if (button.id === `turnBackPartida${partidaId}`) {
				console.log(`Botão Retomar clicado para a partida ${partidaId}`);
			} else if (button.id === `delPartida${partidaId}`) {
				console.log(`Botão Remover clicado para a partida ${partidaId}`);
				// Busca o token armazenado no login
				var token = localStorage.getItem("token");
	
				// Configurar o cabeçalho com a autorizção do token
				var config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				try {
					Swal.fire({
						title: "Tem certeza?",
						text: "Você não poderá reverter essa ação!",
						icon: "warning",
						showCancelButton: true,
						confirmButtonText: "Sim, remova!"
					  }).then((result) => {
						if (result.isConfirmed) {
							// Faça a requisição para deletar  a partida
							axios.delete(`${url}partida/${partidaId}`, config)
							.then((response) => {
								Swal.fire({
									icon: 'success',
									title: 'Partida removida com sucesso.',
									showConfirmButton: false,
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									// Redireciona para a página inicial do cms após o tempo definido
									window.location.href = `/painelws`;
								}).catch((error) => {
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
								});;
							}).catch((error) => {
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
					  }).catch((error) => {
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
				} catch (error) {
					console.error(error);
				}
				
			}
		}
	})
}
// Função para adicionar ouvintes de eventos ao timesContainer, renderizado pelo JS - Front
function addEventListenersToTimesContainer() {
	document.getElementById("timesContainer").addEventListener("click", async function (event) {
		const timeId = event.target.closest(".cardDashboard_division").dataset.timeId;
		const timeElement = event.target.closest(".cardDashboard_division");
		
		// Verifica se o clique foi no botão de Deletar
		if (event.target.id === `delTime${timeId}`) {
			// Fazer uma solicitação PUT para atualizar o status do time para "Em Andamento"
			Swal.fire({
				title: "Tem certeza?",
				text: "Você não poderá reverter essa ação!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Sim, remova!"
			  }).then((result) => {
				if (result.isConfirmed) {
					delTime(timeElement, timeId).then((response) => {
					})
				}
			  }).catch((error) => {
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
	
		// Verifica se o clique foi em um item de campeonato (excluindo botões de opções),
		// para remover a classe time_active e renderizar as partidas
		const timeDivision = event.target.closest(".cardDashboard_division");
		if (timeDivision && !event.target.closest(".dropdown-content")) {
			// Remova a classe time_active do campeonato antigo
			const timeAtivo = document.querySelector(".time_active");
			if (timeAtivo) {
				timeAtivo.classList.remove("time_active");
			}
			// Adicione a classe time_active ao campeonato clicado
			timeElement.classList.add("time_active");
			const jogadorLinkElement = document.getElementById("buttonJogadorAdd");

			// Modifica o atributo href
			jogadorLinkElement.href = `/painelws/time/${timeId}/jogador/add`;
			jogadorLinkElement.dataset.timeId=timeId;

			renderJogadores(timeId);
		}

	});
}
// Função para adicionar ouvintes de eventos ao jogadoresContainer, renderizado pelo JS - Front
function addEventListenersTojogadoresContainer() {
	document.getElementById("jogadoresContainer").addEventListener("click", async function (event) {
		// Obtenha o ID do jogador clicado
		const jogadorId = event.target.closest(".cardDashboard_division").dataset.jogadorId;
		const jogadorElement = event.target.closest(".cardDashboard_division");
		const jogadorTimeID = document.getElementById("buttonJogadorAdd").dataset.timeId;
	
		// Verifica se o clique foi no botão de Deletar
		if (event.target.id === `delJogador${jogadorId}`) {
			// Fazer uma solicitação PUT para atualizar o status do jogador para "Em Andamento"
			Swal.fire({
				title: "Tem certeza?",
				text: "Você não poderá reverter essa ação!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Sim, remova!"
			  }).then((result) => {
				if (result.isConfirmed) {
					deljogador(jogadorElement, jogadorId, jogadorTimeID).then((response) => {
						Swal.fire({
							icon: 'success',
							title: 'Jogador removido com sucesso',
							showConfirmButton: false,
							showConfirmButton: false,
							timer: 1500,
						});
						window.location.href = `/painelws/`;
						return false;
					})
				}
			  }).catch((error) => {
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
}
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
	}
}
// Função para renderizar para jogadores do time selecionado.
async function renderJogadores(timeId) {
	// Obtém uma referência ao elemento
	const jogadorLinkElement = document.getElementById("buttonJogadorAdd");

	// Modifica o atributo href
	jogadorLinkElement.href = `/painelws/time/${timeId}/jogador/add`;
	jogadorLinkElement.dataset.timeId=timeId;
	//busca o token armazenado no login
	var token = localStorage.getItem("token");

	// Configurar o cabeçalho com a autorizção do token
	var config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	// Faça a requisição para pegar os jogadores do time clicado
	axios.get(`${url}time/players/${timeId}`, config)
	.then((response) => {
		// Se não houverem times, mostre mensagem informativa
		if (response.data.length === 0) {
			// Renderiza as jogadores no contêiner de jogadores
			const jogadoresContainer = document.getElementById("jogadoresContainer");
			jogadoresContainer.innerHTML = ""; // Limpe o conteúdo anterior
			const nojogadoreMessage = document.createElement("p");
			nojogadoreMessage.innerHTML = "Nenhum jogador disponível.";
			jogadoresContainer.appendChild(nojogadoreMessage);
		}else{
			// Renderiza as jogadores no contêiner de jogadores
			const jogadoresContainer = document.getElementById("jogadoresContainer");
			jogadoresContainer.innerHTML = ""; // Limpe o conteúdo anterior
			response.data.forEach((jogador) => {
				const jogadorElement = document.createElement("div");
				jogadorElement.id = `jogador_${jogador.idJogador}`;
				jogadorElement.classList.add("cardDashboard_division");
				jogadorElement.setAttribute("aria-current", "true");
				jogadorElement.dataset.jogadorId = jogador.idJogador;
				jogadorElement.innerHTML = `
					<div class="cardDashboard_division_content">
					<div class="cardDashboard_division_text">
						<span class="cardDashboard_division_name">${jogador.nomeJogador} ${jogador.sobrenome}</span>
						<p class="cardDashboard_division_username">Nº Camiseta:${jogador.numeroCamiseta}</p>
					</div>

						<div class="paste-button">
							<button class="painelws_Btn">
								<i class="ri-more-2-fill"></i>
								<div class="painelws_Btn_text">Opções</div>
							</button>
							<div class="dropdown-content">
								<a id="editJogador${jogador.idJogador}" href="/painelws/jogador/${jogador.idJogador}"><i class="ri-pencil-line"></i>Editar</a>
								<a id="delJogador${jogador.idJogador}" ><i class="ri-delete-bin-line"></i>Remover</a>
							</div>
						</div>
					</div>
				`;
				jogadoresContainer.appendChild(jogadorElement);
			});
			// Adiciona ouvintes de eventos após renderizar os elementos
			addEventListenersTojogadoresContainer();
		}
	})
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
// Função para requisição para remover o campeonato
async function delTime(timeElement,timeId) {
	// Obtenha o ID do campeonato clicado
	const campeonatoId = document.getElementById("buttonTimeAdd").dataset.campeonatoId;
	console.log( timeId, campeonatoId);
	var token = localStorage.getItem("token");
				var config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
	await axios.delete(`${url}time_campeonato/${campeonatoId}/time/${timeId}`, config)
	.then((response) => {
		Swal.fire({
			icon: 'success',
			title: 'Time removido com sucesso',
			showConfirmButton: false,
			showConfirmButton: false,
			timer: 1500,
		});
		// Remover o time
		timeElement.parentNode.removeChild(timeElement);
	})
	.catch((error) => {
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
};
// Função para requisição para remover o jogador
async function deljogador(jogadorElement,jogadorId,jogadorTimeID) {
	var token = localStorage.getItem("token");
				var config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
	await axios.put(`${url}jogador/disenroll`,{idJogador: jogadorId, idTime: jogadorTimeID}, config)
	.then((response) => {
		// Remover o jogador
		jogadorElement.parentNode.removeChild(jogadorElement);
	})
	.catch((error) => {
		console.error(error);
	});
};