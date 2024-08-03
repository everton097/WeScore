let countTime01 = 0,
	intervalIDTime01 = 0,
	controlet1 = "semponto",
	rotacaot1 = "mantem"

let countTime02 = 0,
	intervalIDTime02 = 0,
	controlet2 = "semponto",
	rotacaot2 = "mantem"

let timeDireita = 0,
	timeEsquerda = 0,
	nomeTimeDireita = "",
	nomeTimeEsquerda = "",
	rotacaoliberoDireita,
	rotacaoliberoEsquerda
// Controle de estado para armazenar os IDs dos times selecionados
let selectedTimes = [],
	partida = {},
	jogadoresEmQuadraDireita = [],
	jogadoresEmQuadraEsquerda = []

	// Obtenha todos os botões com atributo 'data-target'
const alterCards = document.querySelectorAll("[data-target]")

// Adicione um evento de clique a cada botão
alterCards.forEach((alterCard) => {
	alterCard.addEventListener("click", () => {
		// Oculte todos os elementos
		document
			.querySelectorAll("#cartoes, #quadradejogos, #substituicao")
			.forEach((element) => {
				element.style.display = "none"
			})

		// Mostre o elemento correspondente com base no atributo 'data-target'
		const targetId = alterCard.getAttribute("data-target")
		document.getElementById(targetId).style.display = "block"
	})
})

const partidaID = document.getElementById("idPartida").dataset.partidaId
if (partidaID) {
	// busca o token armazenado no login
	var token = localStorage.getItem("token")
	// Configurar o cabeçalho com a autorização do token
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	}
	// Fazer uma solicitação GET para recuperar ultimo ponto da partida
	axios
		.get(`${url}ponto/last/${partidaID}`, config)
		.then((response) => {
			partida = response.data
			if (
				partida.ptTime1 === 0 &&
				partida.ptTime2 === 0 &&
				partida.set === 1 &&
				partida.idTime === null &&
				partida.ladoQuadraTime1 === null &&
				partida.ladoQuadraTime2 === null &&
				partida.saqueInicial === null
			) {
				const newModelPartida = document.createElement("div")
				newModelPartida.id = `modalDefinicaoLado`
				newModelPartida.classList.add("modal")
				newModelPartida.innerHTML = `
					<div class="modal-content">
							<h2>Definição de lado da quadra</h2>
							<div class="modal-body">
								<form id="createCampeonatoForm" enctype="multipart/form-data" class="form">
									<div class="group">
											<div id="subselectorContainer" class="subselector_container">
													<label for="timesCadastrados">Times da partida</label>
													
													<div id="${partidaResponse.idTime1}" class="subselector cardTimeSelect" data-time-id="${partidaResponse.idTime1}">
															<div class="subselector_image">
																	<img src="http://localhost:3001/public/upload/img/time/${partidaResponse.logoTime1}" alt="logo do time" />
															</div>
															<div class="subselector_content">
																	<div class="subselector_name">
																			<p class="subselector_nameTime">${partidaResponse.nomeTime1}</p>
																	</div>
															</div>
													</div>

													<div id="${partidaResponse.idTime2}" class="subselector cardTimeSelect" data-time-id="${partidaResponse.idTime2}">
															<div class="subselector_image">
																	<img src="http://localhost:3001/public/upload/img/time/${partidaResponse.logoTime2}" alt="logo do time" />
															</div>
															<div class="subselector_content">
																	<div class="subselector_name">
																			<p class="subselector_nameTime">${partidaResponse.nomeTime2}</p>
																	</div>
															</div>
													</div>
													
											</div>
									</div>

									<div class="group">
											<div id="cadrastroNovoPartida" class="subselector_container">
													<label for="cadastrarNovoPartida">Quadra / Saque</label>
													<div id="TimesNew_containerPartida">
															<div id="TimesNewPartida0" class="subselector cardTimeSelect" data-time-id="{{idTime}}">
																	<div class="subselector_image"></div>
																	<div class="subselector_content">
																			<div class="subselector_name">
																					<p class="subselector_nameTime">Escolha um time</p>
																			</div>
																	</div>
															</div>
															<div id="TimesNewPartida0" class="subselector cardTimeSelect" data-time-id="{{idTime}}">
																	<div class="subselector_image"></div>
																	<div class="subselector_content">
																			<div class="subselector_name">
																					<p class="subselector_nameTime">Escolha um time</p>
																			</div>
																	</div>
															</div>
													</div>
											</div>
									</div>
								</form>
							</div>
							<div class="modal-footer">
									<button id="btnFecharModalmodalDefinicaoLado" class="btn btn-cancel" style="display: none">Fechar</button>
									<button id="btnSalvarModalmodalDefinicaoLado" class="btn btn-primary">Salvar</button>
							</div>
					</div>
				`
				document.body.appendChild(newModelPartida)
				openModal("modalDefinicaoLado")
				timeDefinicaoladoQuadraEvent("subselectorContainer")
				timeDefinicaoSaqueEvent()
				// Evento para salvar os dados quando o usuário clica no botão "Salvar"
				document.getElementById("btnSalvarModalmodalDefinicaoLado")
					.addEventListener("click", function () {
						const dadosParaEnviarAPI = prepararDadosParaAPIDefinicaoTimes(
							partidaResponse,
							selectedTimes
						)
						partida.ladoQuadraTime1 = dadosParaEnviarAPI.ladoQuadraTime1
						partida.ladoQuadraTime2 = dadosParaEnviarAPI.ladoQuadraTime2
						partida.saqueInicial = dadosParaEnviarAPI.saqueInicial

						renderizarPlacar(partidaResponse, partida)

						// Fazer uma atualização PUT para atualizar o ponto inicial da partida
						axios
							.put(
								`${url}ponto/initial/${partidaID}`,
								dadosParaEnviarAPI,
								config
							)
							.then((response) => {
								closeModal("modalDefinicaoLado")
								renderizarPlacar(partidaResponse, partida)
								const newModelPartida = document.createElement("div")
								newModelPartida.id = `modalDefinicaoJogadores`
								newModelPartida.classList.add("modal")
								newModelPartida.innerHTML = `
									<div class="modal-content">
											<h2>Definição de jogadores titulares</h2>
											<div class="modal-body">
												<form id="selecaoJogadoresForm" enctype="multipart/form-data" class="form">
													<div class="group">
															<div id="subselectorContainer" class="subselector_container">
																	<label for="timesCadastrados"><strong>${nomeTimeEsquerda}</strong></label>
																	<div id="escolhaJogadoresLadoEsquerdo" class="escolhaJogadoresLadoEsquerdo"></div>
															</div>
													</div>

													<div class="group">
															<div id="subselectorContainer" class="subselector_container">
																	<label for="timesCadastrados"><strong>${nomeTimeDireita}</strong></label>
																	<div id="escolhaJogadoresLadoDireito" class="escolhaJogadoresLadoDireito"></div>
															</div>
													</div>

													<div class="group">
															<div id="subselectorContainer" class="subselector_container">
																	<label for="timesCadastrados"><strong>Quadra final</strong></label>
																	<div class="quadradejogo">
																		<div class="volleyball-court">
																			<div class="service-area left"></div>
																			<div class="service-area right"></div>
																			<div class="attack-area left"></div>
																			<div class="attack-area right"></div>
																			<div class="attack-line left"></div>
																			<div class="attack-line right"></div>
																			<div class="coach-box left"></div>
																			<div class="coach-box right"></div>
																			<div class="coach-box left bottom"></div>
																			<div class="coach-box right bottom"></div>
																			<div class="baseline"></div>
																			<div class="net"></div>
																		</div>
																		<div class="quadraVolei">
																			<div class="ballplayer">
																				<div class="jogadoresTime01 quadra">
																					<div id="JogadorEsquerda0" class="bolinha" style="left: 10%; top: 78%;"></div>
																					<div id="JogadorEsquerda1" class="bolinha" style="left: 65%; top: 78%;"></div>
																					<div id="JogadorEsquerda2" class="bolinha" style="left: 65%; top: 40%;"></div>
																					<div id="JogadorEsquerda3" class="bolinha" style="left: 65%; top:  8%;"></div>
																					<div id="JogadorEsquerda4" class="bolinha" style="left: 10%; top:  8%;"></div>
																					<div id="JogadorEsquerda5" class="bolinha" style="left: 10%; top: 40%;"></div>
																					<div id="JogadorEsquerda6" class="bolinha libero" style="left: 10%; top: 55%;"></div>
																				</div>
																			</div>
																			<div class="ballplayer">
																				<div class="jogadoresTime02 quadra">
																					<div id="JogadorDireita0" class="bolinha2" style="left: 75%; top:  8%;"></div>
																					<div id="JogadorDireita1" class="bolinha2" style="left: 25%; top:  8%;"></div>
																					<div id="JogadorDireita2" class="bolinha2" style="left: 25%; top: 40%;"></div>
																					<div id="JogadorDireita3" class="bolinha2" style="left: 25%; top: 78%;"></div>
																					<div id="JogadorDireita4" class="bolinha2" style="left: 75%; top: 78%;"></div>
																					<div id="JogadorDireita5" class="bolinha2" style="left: 75%; top: 40%;"></div>
																					<div id="JogadorDireita6" class="bolinha2 libero" style="left: 85%; top: 55%;"></div>
																				</div>
																			</div>
																		</div>
																	</div>
															</div>
													</div>
												</form>
											</div>
											<div class="modal-footer">
													<button id="btnFecharModalmodalDefinicaoJogadores" class="btn btn-cancel" style="display: none">Fechar</button>
													<button id="btnSalvarModalmodalDefinicaoJogadores" class="btn btn-primary">Salvar</button>
											</div>
									</div>
								`

								document.body.appendChild(newModelPartida)
								renderizarJogadores(jogadoresTime1, jogadoresTime2, timeEsquerda, timeDireita)
								openModal("modalDefinicaoJogadores")
								// Evento para salvar os dados quando o usuário clica no botão "Salvar"
								document
									.getElementById("btnSalvarModalmodalDefinicaoJogadores")
									.addEventListener("click", function () {
										const dadosParaEnviarAPI =
											prepararDadosParaAPIDefinicaoJogadores()
										// Fazer uma solicitação POST para vincular jogadores em suas posições
										axios
											.post(`${url}posicao/create`, dadosParaEnviarAPI, config)
											.then((response) => {
												Swal.fire({
													icon: "success",
													title: "Jogadores vinculados com sucesso",
													showConfirmButton: false,
													timer: 1500,
												}).then(() => {
													closeModal("modalDefinicaoJogadores")
													AtualizarDadosPartida(response)
													adicionarJogadoresTitularesEmQuadra(jogadoresTime1, jogadoresTime2, timeEsquerda, timeDireita, jogadoresEmQuadraEsquerda,jogadoresEmQuadraDireita)
												})
											})
											.catch((error) => {
												console.error(error)
												if (error.response) {
													const { data, status } = error.response
													Swal.fire({
														icon: "error",
														title: `${data.error}`,
														text: `Erro ${status} ` || "Erro desconhecido",
													})
												} else if (error.request) {
													// A solicitação foi feita, mas não houve resposta do servidor
													console.error("Sem resposta do servidor")
												} else {
													// Algo aconteceu durante a configuração da solicitação que acionou um erro
													console.error(
														"Erro na configuração da solicitação",
														error.message
													)
												}
											})
									})
							})
							.catch((error) => {
								console.error(error)
								if (error.response) {
									const { data, status } = error.response
									Swal.fire({
										icon: "error",
										title: `Erro ao atualizar ponto inicial da Partida.\n${data.error}`,
										text: `Erro ${status} ` || "Erro desconhecido",
									})
								} else if (error.request) {
									// A solicitação foi feita, mas não houve resposta do servidor
									console.error("Sem resposta do servidor")
								} else {
									// Algo aconteceu durante a configuração da solicitação que acionou um erro
									console.error(
										"Erro na configuração da solicitação",
										error.message
									)
								}
							})
					})
			} else {
				countTime01 = partida.ptTime1
				countTime02 = partida.ptTime2
				renderizarPlacar(partidaResponse, partida)
				// Fazer uma solicitação POST para buscar jogadores em suas posições
				axios.get(`${url}posicao/allLastByPoint/${partida.idPonto}`, config)
				.then((response) => {
					AtualizarDadosPartida(response)
					adicionarJogadoresTitularesEmQuadra(jogadoresTime1, jogadoresTime2, timeEsquerda, timeDireita, jogadoresEmQuadraEsquerda, jogadoresEmQuadraDireita)
				})
				.catch((error) => {
					console.error(error)
					if (error.response) {
						const { data, status } = error.response
						Swal.fire({
							icon: "error",
							title: `Erro ao buscar jogadores em suas posições.\n${data.error}`,
							text: `Erro ${status} ` || "Erro desconhecido",
						})
					} else if (error.request) {
						// A solicitação foi feita, mas não houve resposta do servidor
						console.error("Sem resposta do servidor")
					} else {
						// Algo aconteceu durante a configuração da solicitação que acionou um erro
						console.error(
							"Erro na configuração da solicitação",
							error.message
						)
					}
				})
			}
		})
		.catch((error) => {
			console.error(error)
			if (error.response) {
				const { data, status } = error.response
				Swal.fire({
					icon: "error",
					title: `Erro ao Recuperar pontos de Partida.\n${data.error}`,
					text: `Erro ${status} ` || "Erro desconhecido",
				})
			} else if (error.request) {
				// A solicitação foi feita, mas não houve resposta do servidor
				console.error("Sem resposta do servidor")
			} else {
				// Algo aconteceu durante a configuração da solicitação que acionou um erro
				console.error("Erro na configuração da solicitação", error.message)
			}
		})
}

const valueTime01 = document.getElementById("valueTime01")
const plusButtonTime01 = document.getElementById("plusTime01")
const minusButtonTime01 = document.getElementById("minusTime01")
const bola01 = document.getElementById("bolavolei01").style.opacity
const chamadaAPINewPonto = (timeMarcouPonto) => {
	let ptTime1, ptTime2, ladoQuadraTime1, ladoQuadraTime2
  const isTime1Esquerda = partida.ladoQuadraTime1 === "Esquerda"
  // Verificar qual time está à esquerda para determinar os pontos e lados corretamente
  if (isTime1Esquerda) {
    ptTime1 = countTime01
    ptTime2 = countTime02
    ladoQuadraTime1 = "Esquerda"
    ladoQuadraTime2 = "Direita"
  } else {
    ptTime1 = countTime02
    ptTime2 = countTime01
    ladoQuadraTime1 = "Direita"
    ladoQuadraTime2 = "Esquerda"
  }
	// busca o token armazenado no login
	var token = localStorage.getItem("token")
	// Configurar o cabeçalho com a autorização do token
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	}
  axios
		.post(
			`${url}ponto/plus/${partidaID}`,
			{
				ptTime1: ptTime1,
				ptTime2: ptTime2,
				ladoQuadraTime1: ladoQuadraTime1,
				ladoQuadraTime2: ladoQuadraTime2,
				idTime: timeMarcouPonto,
				set: partida.set,
				saqueInicial: partida.saqueInicial,
				idPartida: partida.idPartida,
			},
			config
		)
		.then((response) => {			
			partida=response.data
			const dadosParaEnviarAPI = prepararDadosParaAPIDefinicaoJogadores()
			axios			
			.post(`${url}posicao/create`, dadosParaEnviarAPI, config)
				.then((response) => {
				})
				.catch((error) => {
					if (error.response) {
						const { data, status } = error.response
						Swal.fire({
							icon: "error",
							title: `Erro ao atualizar rodízio dos jogadores.\n${data.error}`,
							text: `Erro ${status} ` || "Erro desconhecido",
						})
						console.error(error)
					} else if (error.request) {
						console.error("A solicitação foi feita, mas não houve resposta da API")
					} else {
						console.error(
							"Algo aconteceu durante a configuração da solicitação que acionou um erro",
							error.message
						)
					}
				})
		})
		.catch((error) => {
			if (error.response) {
				const { data, status } = error.response
				Swal.fire({
					icon: "error",
					title: `Erro ao atualizar ponto da Partida.\n${data.error || data.message}`,
					text: `Erro ${status} ` || "Erro desconhecido",
				})
			} else if (error.request) {
				console.error("A solicitação foi feita, mas não houve resposta da API")
			} else {
				console.error(
					"Algo aconteceu durante a configuração da solicitação que acionou um erro",
					error.message
				)
			}
			console.error(error)
		})
}
const indicadorPonto = () => {
  const timeQueMarcou = partida.idTime || partida.saqueInicial
  if (timeQueMarcou === timeEsquerda) {
    document.getElementById("bolavolei01").style.opacity = "1"
    document.getElementById("bolavolei02").style.opacity = "0"
  } else if (timeQueMarcou === timeDireita) {
    document.getElementById("bolavolei01").style.opacity = "0"
    document.getElementById("bolavolei02").style.opacity = "1"
  }
}
const updateValueTime01 = (inicial) => {
	if (countTime01 <= 9) {
		valueTime01.innerHTML = "0" + countTime01
	} else if (countTime01 > 9) {
		valueTime01.innerHTML = countTime01
		if (countTime01 > 24 && countTime01 >= countTime02 + 2) {
			exibirMensagemVencedor(nomeTimeEsquerda,partida.set)
		}
	}
	if (!inicial) {
		const isTime1Esquerda = partida.ladoQuadraTime1 === "Esquerda"
		let timeMarcou
		if (isTime1Esquerda) {
			timeMarcou = partidaResponse.idTime1
		} else {
			timeMarcou = partidaResponse.idTime2
		}
		chamadaAPINewPonto(timeMarcou)
	}
	indicadorPonto();
}
const updateValueTime02 = (inicial) => {
	if (countTime02 <= 9) {
		valueTime02.innerHTML = "0" + countTime02
	} else if (countTime02 > 9) {
		valueTime02.innerHTML = countTime02
		if (countTime02 > 24 && countTime02 >= countTime01 + 2) {
			exibirMensagemVencedor(nomeTimeDireita,partida.set)
		}
	}
	if (!inicial) {
		const isTime1Direita = partida.ladoQuadraTime1 === "Direita"
		let timeMarcou
		if (isTime1Direita) {
			timeMarcou = partidaResponse.idTime1
		} else {
			timeMarcou = partidaResponse.idTime2
		}
		chamadaAPINewPonto(timeMarcou)
	}
	indicadorPonto();
}

const valueTime02 = document.getElementById("valueTime02")
const plusButtonTime02 = document.getElementById("plusTime02")
const minusButtonTime02 = document.getElementById("minusTime02")

plusButtonTime01.addEventListener("click", () => {
	if (countTime01 >= 0 && countTime01 < 40) {
		countTime01 += 1
		rotacaoJogadoresEsquerda()
		updateValueTime01(false)
		controlet1 = "ponto"
		controlet2 = "semponto"
	}
})
// Adicione um ouvinte de evento ao documento
document.addEventListener("keydown", () => {
	// Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
	if (countTime01 >= 0 && countTime01 < 40 && event.key === "q") {
		countTime01 += 1
		rotacaoJogadoresEsquerda()
		updateValueTime01(false)
		controlet1 = "ponto"
		controlet2 = "semponto"
	}
})
plusButtonTime01.addEventListener("mousedown", () => {
	if (countTime01 >= 0 && countTime01 < 40) {
		intervalIDTime01 = setInterval(() => {
			countTime01 += 1
			rotacaoJogadoresEsquerda()
			updateValueTime01(false)
			controlet1 = "ponto"
			controlet2 = "semponto"
			if (countTime01 == 40) {
				clearInterval(intervalIDTime01)
			}
		}, 200)
	}
})
minusButtonTime01.addEventListener("click", () => {
	if (countTime01 > 0 && countTime01 <= 40) {
		countTime01 -= 1
		desfazerRotacaoJogadoresEsquerda()
		updateValueTime01(false)
	}
})
document.addEventListener("keydown", () => {
	// Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
	if (countTime01 > 0 && countTime01 <= 40 && event.key === "a") {
		countTime01 -= 1
		desfazerRotacaoJogadoresEsquerda()
		updateValueTime01(false)
	}
})
minusButtonTime01.addEventListener("mousedown", () => {
	if (countTime01 > 0 && countTime01 <= 40) {
		intervalIDTime01 = setInterval(() => {
			countTime01 -= 1
			desfazerRotacaoJogadoresEsquerda()
			updateValueTime01(false)
			if (countTime01 == 40 || countTime01 == 0) {
				clearInterval(intervalIDTime01)
			}
		}, 200)
	}
})
document.addEventListener("mouseup", () => clearInterval(intervalIDTime01))

const posiocaoLeftT1 = [0, 55, 55, 55, 0, 0]
const posiocaoTopT1 = [75, 75, 37.5, 2, 2, 37.5]
const posiocaoLiberoT1 = [-10, 55]
const rotacaoLiberoT1 = [5,4,0]

function rotacaoJogadoresEsquerda() {
	if (controlet1 == "semponto" && rotacaot1 == "mantem") {
		//Altera posição dos jogadores.
		moveRight(posiocaoLeftT1)
		moveRight(posiocaoTopT1)
		moveLeft(rotacaoliberoEsquerda)
		// Altera array de jogadoresTitulares do jogo
		moveLeftTimeCompleto(jogadoresEmQuadraEsquerda)
		JogadorEsquerda0.style.left = `${posiocaoLeftT1[0]}%`
		JogadorEsquerda0.style.top = `${posiocaoTopT1[0]}%`
		JogadorEsquerda1.style.left = `${posiocaoLeftT1[1]}%`
		JogadorEsquerda1.style.top = `${posiocaoTopT1[1]}%`
		JogadorEsquerda2.style.left = `${posiocaoLeftT1[2]}%`
		JogadorEsquerda2.style.top = `${posiocaoTopT1[2]}%`
		JogadorEsquerda3.style.left = `${posiocaoLeftT1[3]}%`
		JogadorEsquerda3.style.top = `${posiocaoTopT1[3]}%`
		JogadorEsquerda4.style.left = `${posiocaoLeftT1[4]}%`
		JogadorEsquerda4.style.top = `${posiocaoTopT1[4]}%`
		JogadorEsquerda5.style.left = `${posiocaoLeftT1[5]}%`
		JogadorEsquerda5.style.top = `${posiocaoTopT1[5]}%`
		rotacaot1 = "rotacionou"
		rotacaot2 = "mantem"
	} else {
		rotacaot1 = "mantem"
	}
}
function desfazerRotacaoJogadoresEsquerda() {
	if (controlet1 == "ponto" && rotacaot1 == "rotacionou") {
		//Altera posição dos jogadores.
		moveLeft(posiocaoLeftT1)
		moveLeft(posiocaoTopT1)
		moveRight(rotacaoliberoEsquerda)
		// Altera array de jogadoresTitulares do jogo
		moveRightTimeCompleto(jogadoresEmQuadraEsquerda)
		JogadorEsquerda0.style.left = `${posiocaoLeftT1[0]}%`
		JogadorEsquerda0.style.top = `${posiocaoTopT1[0]}%`
		JogadorEsquerda1.style.left = `${posiocaoLeftT1[1]}%`
		JogadorEsquerda1.style.top = `${posiocaoTopT1[1]}%`
		JogadorEsquerda2.style.left = `${posiocaoLeftT1[2]}%`
		JogadorEsquerda2.style.top = `${posiocaoTopT1[2]}%`
		JogadorEsquerda3.style.left = `${posiocaoLeftT1[3]}%`
		JogadorEsquerda3.style.top = `${posiocaoTopT1[3]}%`
		JogadorEsquerda4.style.left = `${posiocaoLeftT1[4]}%`
		JogadorEsquerda4.style.top = `${posiocaoTopT1[4]}%`
		JogadorEsquerda5.style.left = `${posiocaoLeftT1[5]}%`
		JogadorEsquerda5.style.top = `${posiocaoTopT1[5]}%`
		controlet1 = "semponto"
		rotacaot1 = "mantem"
		rotacaot2 = "rotacionou"
	}
}
//Time 02
plusButtonTime02.addEventListener("click", () => {
	if (countTime02 >= 0 && countTime02 < 40) {
		countTime02 += 1
		rotacaoJogadoresDireita()
		updateValueTime02(false)
		controlet2 = "ponto"
		controlet1 = "semponto"
	}
})
// Adicione um ouvinte de evento ao documento
document.addEventListener("keydown", () => {
	// Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
	if (countTime02 >= 0 && countTime02 < 40 && event.key === "e") {
		countTime02 += 1
		rotacaoJogadoresDireita()
		updateValueTime02(false)
		controlet2 = "ponto"
		controlet1 = "semponto"
	}
})
plusButtonTime02.addEventListener("mousedown", () => {
	if (countTime02 >= 0 && countTime02 < 40) {
		intervalIDTime02 = setInterval(() => {
			countTime02 += 1
			rotacaoJogadoresDireita()
			updateValueTime02(false)

			controlet2 = "ponto"
			controlet1 = "semponto"
			if (countTime02 == 40) {
				clearInterval(intervalIDTime02)
			}
		}, 200)
	}
})
minusButtonTime02.addEventListener("click", () => {
	if (countTime02 > 0 && countTime02 <= 40) {
		countTime02 -= 1
		desfazerRotacaoJogadoresDireita()
		updateValueTime02(false)
	}
})
document.addEventListener("keydown", () => {
	// Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
	if (countTime02 > 0 && countTime02 <= 40 && event.key === "d") {
		countTime02 -= 1
		desfazerRotacaoJogadoresDireita()
		updateValueTime02(false)
	}
})
minusButtonTime02.addEventListener("mousedown", () => {
	if (countTime02 > 0 && countTime02 <= 40) {
		intervalIDTime02 = setInterval(() => {
			countTime02 -= 1
			desfazerRotacaoJogadoresDireita()
			updateValueTime02(false)
			if (countTime02 == 40 || countTime02 == 0) {
				clearInterval(intervalIDTime02)
			}
		}, 200)
	}
})
document.addEventListener("mouseup", () => clearInterval(intervalIDTime02))


const posiocaoLeftT2 = [75, 25, 25, 25, 75, 75]
const posiocaoTopT2 = [0, 0, 37.5, 75, 75, 37.5]
const posiocaoLiberoT2 = [70, 55]
const rotacaoLiberoT2 = [5,4,0]
function rotacaoJogadoresDireita() {
	if (controlet2 == "semponto" && rotacaot2 == "mantem") {
		//Altera posição dos jogadores.
		moveRight(posiocaoLeftT2)
		moveRight(posiocaoTopT2)
		moveLeft(rotacaoliberoDireita)
		// Altera array de jogadoresTitulares do jogo
		moveLeftTimeCompleto(jogadoresEmQuadraDireita)
		JogadorDireita0.style.left = `${posiocaoLeftT2[0]}%`
		JogadorDireita0.style.top = `${posiocaoTopT2[0]}%`
		JogadorDireita1.style.left = `${posiocaoLeftT2[1]}%`
		JogadorDireita1.style.top = `${posiocaoTopT2[1]}%`
		JogadorDireita2.style.left = `${posiocaoLeftT2[2]}%`
		JogadorDireita2.style.top = `${posiocaoTopT2[2]}%`
		JogadorDireita3.style.left = `${posiocaoLeftT2[3]}%`
		JogadorDireita3.style.top = `${posiocaoTopT2[3]}%`
		JogadorDireita4.style.left = `${posiocaoLeftT2[4]}%`
		JogadorDireita4.style.top = `${posiocaoTopT2[4]}%`
		JogadorDireita5.style.left = `${posiocaoLeftT2[5]}%`
		JogadorDireita5.style.top = `${posiocaoTopT2[5]}%`
		rotacaot2 = "rotacionou"
		rotacaot1 = "mantem"
	} else {
		rotacaot2 = "mantem"
	}
}
function desfazerRotacaoJogadoresDireita() {
	if (controlet2 == "ponto" && rotacaot2 == "rotacionou") {
		//Altera posição dos jogadores.
		moveLeft(posiocaoLeftT2)
		moveLeft(posiocaoTopT2)
		moveRight(rotacaoliberoDireita)
		// Altera array de jogadoresTitulares do jogo
		moveRightTimeCompleto(jogadoresEmQuadraDireita)
		JogadorDireita0.style.left = `${posiocaoLeftT2[0]}%`
		JogadorDireita0.style.top = `${posiocaoTopT2[0]}%`
		JogadorDireita1.style.left = `${posiocaoLeftT2[1]}%`
		JogadorDireita1.style.top = `${posiocaoTopT2[1]}%`
		JogadorDireita2.style.left = `${posiocaoLeftT2[2]}%`
		JogadorDireita2.style.top = `${posiocaoTopT2[2]}%`
		JogadorDireita3.style.left = `${posiocaoLeftT2[3]}%`
		JogadorDireita3.style.top = `${posiocaoTopT2[3]}%`
		JogadorDireita4.style.left = `${posiocaoLeftT2[4]}%`
		JogadorDireita4.style.top = `${posiocaoTopT2[4]}%`
		JogadorDireita5.style.left = `${posiocaoLeftT2[5]}%`
		JogadorDireita5.style.top = `${posiocaoTopT2[5]}%`
		controlet2 = "semponto"
		rotacaot2 = "mantem"
		rotacaot1 = "rotacionou"
	}
}

// Função para mover os elementos do vetor para a direita
function moveRight(arr) {
	const lastElement = arr.pop()
	arr.unshift(lastElement)
}
// Função para mover os elementos do vetor para a esquerda
function moveLeft(arr) {
	const firstElement = arr.shift()
	arr.push(firstElement)
}

// Função para mover os elementos do vetor para a direita
function moveRightTimeCompleto(arr) {
	const secondLastElement = arr.splice(5, 1)[0]
	arr.unshift(secondLastElement)
  const lastElement = arr.pop()
  arr.push(lastElement)
}
// Função para mover os elementos do vetor para a esquerda
function moveLeftTimeCompleto(arr) {
	const firstElement = arr.shift()
	arr.splice(5, 0, firstElement)
}

// Fução para renderizar placar de acordo com escolha de lados
function renderizarPlacar(partidaResponse, partida) {
	const isTime1Esquerda = partida.ladoQuadraTime1 === "Esquerda"
	// Definir os dados do time da esquerda
	timeEsquerda = isTime1Esquerda
		? partidaResponse.idTime1
		: partidaResponse.idTime2
	nomeTimeEsquerda = isTime1Esquerda
		? partidaResponse.nomeTime1
		: partidaResponse.nomeTime2
	const logoTimeEsquerda = isTime1Esquerda
		? partidaResponse.logoTime1
		: partidaResponse.logoTime2
	timeDireita = isTime1Esquerda
		? partidaResponse.idTime2
		: partidaResponse.idTime1
	nomeTimeDireita = isTime1Esquerda
		? partidaResponse.nomeTime2
		: partidaResponse.nomeTime1
	const logoTimeDireita = isTime1Esquerda
		? partidaResponse.logoTime2
		: partidaResponse.logoTime1

	// Atualizar os elementos no DOM
	document.getElementById(
		"logoTimeEsquerda"
	).src = `http://localhost:3001/public/upload/img/time/${logoTimeEsquerda}`
	document.getElementById("nomeTimeEsquerda").innerText = nomeTimeEsquerda
	document.getElementById(
		"logoTimeDireita"
	).src = `http://localhost:3001/public/upload/img/time/${logoTimeDireita}`
	document.getElementById("nomeTimeDireita").innerText = nomeTimeDireita

	// Definir os pontos dos times
	if (isTime1Esquerda) {
		countTime01 = partida.ptTime1
		countTime02 = partida.ptTime2
	} else {
		countTime01 = partida.ptTime2
		countTime02 = partida.ptTime1
	}

	// Verificar o saque inicial ou o ID do time
	const timeSaque = partida.idTime || partida.saqueInicial

	if (timeEsquerda === timeSaque) {
		controlet1 = "ponto"
		controlet2 = "semponto"
		rotacaot1 = "rotacionou"
		rotacaot2 = "mantem"
	} else if (timeDireita === timeSaque) {
		controlet1 = "semponto"
		controlet2 = "ponto"
		rotacaot1 = "mantem"
		rotacaot2 = "rotacionou"
	}

	updateValueTime01(true)
	updateValueTime02(true)
}
// Função para encontrar os lados e preparar os dados para a API
function prepararDadosParaAPIDefinicaoTimes(partidaResponse, selectedTimes) {
	const idTimeSelecionado1 = selectedTimes[0]
	const idTimeSelecionado2 = selectedTimes[1]
	let ladoQuadraTime1, ladoQuadraTime2
	if (
		partidaResponse.idTime1.toString() === idTimeSelecionado1 &&
		partidaResponse.idTime2.toString() === idTimeSelecionado2
	) {
		ladoQuadraTime1 = "Esquerda"
		ladoQuadraTime2 = "Direita"
	} else {
		ladoQuadraTime1 = "Direita"
		ladoQuadraTime2 = "Esquerda"
	}

	// Preparar objeto para enviar à API
	const dadosParaAPI = {
		idPartida: partidaResponse.idPartida,
		ladoQuadraTime1,
		ladoQuadraTime2,
		saqueInicial: parseInt(selectedTimes[2]),
	}
	return dadosParaAPI
}
// Função para encontrar os lados e preparar os dados para a API
function prepararDadosParaAPIDefinicaoJogadores() {
	// Extrair apenas os IDs dos jogadores dos arrays
	const idsJogadoresEmQuadraDireita = jogadoresEmQuadraDireita.map(jogador => jogador.idJogador);
	const idsJogadoresEmQuadraEsquerda = jogadoresEmQuadraEsquerda.map(jogador => jogador.idJogador);
	
	// Preparar objeto para enviar à API
	const dadosParaAPI = {
		idPartida: partida.idPartida,
		idPonto: partida.idPonto,
		jogadoresEmQuadraDireita: idsJogadoresEmQuadraDireita,
		liberoD: rotacaoliberoDireita[0],//sapoha esta fudendo
		jogadoresEmQuadraEsquerda: idsJogadoresEmQuadraEsquerda,
		liberoE: rotacaoliberoEsquerda[0]
	}
	
	return dadosParaAPI
}
// Função para encontrar os lados e preparar os dados para a API
function renderizarJogadores(jogadoresTime1, jogadoresTime2, timeEsquerda, timeDireita) {
	// Função auxiliar para adicionar jogadores ao lado correto
	function adicionarJogadores(
		lado,
		jogadores,
		arrayLado,
		ladojogador,
		posicoesDisponiveis,
		posicoesJogadores,
	) {
		const container = document.getElementById(lado)

		jogadores.forEach((jogador) => {
			const jogadorDiv = document.createElement("div")
			jogadorDiv.id = `jogador${jogador.idJogador}`
			jogadorDiv.classList.add("bolinhaEscolhaJogadores")
			jogadorDiv.innerText = jogador.numeroCamiseta

			// Adicionar ouvinte de clique
			jogadorDiv.addEventListener("click", () => {
				if (arrayLado.some(item => item.idJogador === jogador.idJogador)) {
					// Se já estiver no array, remover
					const index = arrayLado.findIndex(item => item.idJogador === jogador.idJogador)
					const posicaoRemovida = posicoesJogadores[jogador.idJogador]
					arrayLado.splice(index, 1)
					delete posicoesJogadores[jogador.idJogador]
					jogadorDiv.classList.remove("jogadorSelecionado")

					// Limpar a posição correta e devolver a posição ao array de posições disponíveis
					document.querySelector(
						`#Jogador${ladojogador}${posicaoRemovida}`
					).innerHTML = ""

					// Inserir a posição de volta no início do array de posições disponíveis
					posicoesDisponiveis.push(posicaoRemovida)
					posicoesDisponiveis.sort((a, b) => a - b) // Ordenar as posições disponíveis
				} else {
					// Verificar se o usuário está tentando selecionar mais que 6 jogadores para o time
					if (arrayLado.length >= 7) {
						// Exibir mensagem de erro
						Swal.fire({
							icon: "error",
							title: `Você já selecionou 7 jogadores`,
							text: `Não é possível selecionar mais.`,
							showConfirmButton: false,
							timer: 2000,
						})
						return
					}
					// Se não estiver no array, adicionar
					const posicaoAdicionada = posicoesDisponiveis.shift()
					arrayLado.push({ idJogador: jogador.idJogador, local: posicaoAdicionada })
					posicoesJogadores[jogador.idJogador] = posicaoAdicionada
					document.querySelector(
						`#Jogador${ladojogador}${posicaoAdicionada}`
					).innerHTML = `${jogador.numeroCamiseta}`
					jogadorDiv.classList.add("jogadorSelecionado")
				}
			})
			container.appendChild(jogadorDiv)
		})
	}

	// Arrays para manter as posições disponíveis e mapa de posições dos jogadores
	const posicoesDisponiveisEsquerda = [0, 1, 2, 3, 4, 5, 6]
	const posicoesDisponiveisDireita = [0, 1, 2, 3, 4, 5, 6]
	const posicoesJogadoresEsquerda = {}
	const posicoesJogadoresDireita = {}

	// Determinar qual time é da esquerda e qual é da direita
	if (jogadoresTime1.idTime === timeEsquerda) {
		rotacaoliberoEsquerda=rotacaoLiberoT1
		rotacaoliberoDireita=rotacaoLiberoT2
		// Renderizar jogadores do time 1 à esquerda e jogadores do time 2 à direita
		adicionarJogadores(
			"escolhaJogadoresLadoEsquerdo",
			jogadoresTime1.Jogadors,
			jogadoresEmQuadraEsquerda,
			"Esquerda",
			posicoesDisponiveisEsquerda,
			posicoesJogadoresEsquerda,
		)
		adicionarJogadores(
			"escolhaJogadoresLadoDireito",
			jogadoresTime2.Jogadors,
			jogadoresEmQuadraDireita,
			"Direita",
			posicoesDisponiveisDireita,
			posicoesJogadoresDireita,
		)
	} else if (jogadoresTime2.idTime === timeEsquerda) {
		rotacaoliberoEsquerda=rotacaoLiberoT2
		rotacaoliberoDireita=rotacaoLiberoT1
		// Renderizar jogadores do time 2 à esquerda e jogadores do time 1 à direita
		adicionarJogadores(
			"escolhaJogadoresLadoEsquerdo",
			jogadoresTime2.Jogadors,
			jogadoresEmQuadraEsquerda,
			"Esquerda",
			posicoesDisponiveisEsquerda,
			posicoesJogadoresEsquerda,
		)
		adicionarJogadores(
			"escolhaJogadoresLadoDireito",
			jogadoresTime1.Jogadors,
			jogadoresEmQuadraDireita,
			"Direita",
			posicoesDisponiveisDireita,
			posicoesJogadoresDireita,
		)		
	} else {
		console.error("Os IDs dos times não correspondem aos IDs dos lados fornecidos.")
	}
}
function escolhaJogadores() {
closeModal("modalDefinicaoLado")
renderizarPlacar(partidaResponse, partida)
const newModelPartida = document.createElement("div")
newModelPartida.id = `modalDefinicaoJogadores`
newModelPartida.classList.add("modal")
newModelPartida.innerHTML = `
								<div class="modal-content">
										<h2>Definição de jogadores titulares</h2>
										<div class="modal-body">
											<form id="selecaoJogadoresForm" enctype="multipart/form-data" class="form">
												<div class="group">
														<div id="subselectorContainer" class="subselector_container">
																<label for="timesCadastrados"><strong>${nomeTimeEsquerda}</strong></label>
																<div id="escolhaJogadoresLadoEsquerdo" class="escolhaJogadoresLadoEsquerdo"></div>
														</div>
												</div>

												<div class="group">
														<div id="subselectorContainer" class="subselector_container">
																<label for="timesCadastrados"><strong>${nomeTimeDireita}</strong></label>
																<div id="escolhaJogadoresLadoDireito" class="escolhaJogadoresLadoDireito"></div>
														</div>
												</div>
											</form>
										</div>
										<div class="modal-footer">
												<button id="btnFecharModal" class="btn btn-cancel">Fechar</button>
												<button id="btnSalvarModal" class="btn btn-primary">Salvar</button>
										</div>
								</div>
							`

document.body.appendChild(newModelPartida)
renderizarJogadores(jogadoresTime1, jogadoresTime2)
openModal("modalDefinicaoJogadores")
}
// Fazendo parte de substituição
function adicionarJogadoresTitularesEmQuadra(jogadoresTime1, jogadoresTime2, timeEsquerda, timeDireita, jogadoresEmQuadraEsquerda, jogadoresEmQuadraDireita) {
	const containerEsquerda = document.querySelector(".jogadoresTime01")
	const containerDireita = document.querySelector(".jogadoresTime02")

	// Limpar os containers antes de adicionar novos jogadores
	containerEsquerda.innerHTML = ""
	containerDireita.innerHTML = ""

	// Função auxiliar para criar e posicionar jogadores
	function criarJogador(id, jogadorID, numeroCamiseta, lado, posicoesLeft, posicoesTop, libero) {
		const jogadorDiv = document.createElement("div")
		jogadorDiv.id = `Jogador${lado}${id}`
		jogadorDiv.dataset.jogadorId = `${jogadorID}`
		if (id == 6) {
			jogadorDiv.classList.add(`bolinha${lado === "Direita" ? "2" : ""}`)
			jogadorDiv.classList.add("libero")
			jogadorDiv.style.left = `${libero[0]}%`
			jogadorDiv.style.top = `${libero[1]}%`
		} else if (id !== 6) {
			jogadorDiv.classList.add(`bolinha${lado === "Direita" ? "2" : ""}`)
			jogadorDiv.style.left = `${posicoesLeft[id]}%`
			jogadorDiv.style.top = `${posicoesTop[id]}%`
		}
		jogadorDiv.innerText = numeroCamiseta

		// Adicionar ouvinte de clique
		jogadorDiv.addEventListener("click", function(event) {
			if (id == 6) {
				event.stopPropagation() // Impede a propagação do evento para o jogador pai
			}
			let jogadorId = Number(this.dataset.jogadorId)

			const jogadorEmQuadra = lado === "Esquerda"
				? jogadoresEmQuadraEsquerda
				: jogadoresEmQuadraDireita
			// Verificar se o jogador está na
			if (lado === "Esquerda") {
				if(jogadorEmQuadra.includes(jogadorId)){
					openModalSubstituicaoJogador(lado,id,jogadorId,jogadorEmQuadra)
				}
			} else if (lado === "Direita"){
				if(jogadorEmQuadra.includes(jogadorId)){
					openModalSubstituicaoJogador(lado,id,jogadorId,jogadorEmQuadra)
				}
			}
		})

		return jogadorDiv
	}

	// Função para adicionar jogadores ao lado correto
	function adicionarJogadores(jogadoresTitulares, timecompleto, lado, posicoesLeft, posicoesTop, libero) {
		jogadoresTitulares.forEach((elemento, index) => {
			let jogador = timecompleto.find(j => j.idJogador === elemento.idJogador)
			/* // Loop simples com logs para encontrar o jogador
			let jogador = null
			for (let i = 0 i < timecompleto.length i++) {
				const jogadorVerificando = timecompleto[i]
				console.log(`Verificando jogador com idJogador ${idJogador}:`, jogadorVerificando)
				if (jogadorVerificando.idJogador === idJogador) {
					jogador = jogadorVerificando
					break // Interrompe o loop assim que o jogador é encontrado
				}
			} */
			
			if (jogador) {
				const jogadorDiv = criarJogador(index, jogador.idJogador, jogador.numeroCamiseta, lado, posicoesLeft, posicoesTop, libero)
				if (lado === "Esquerda") {
					// Verifica se é o libero, se for, adiciona o jogador junto ao jogador5
					if (index == 6) {
						rotacaoliberoEsquerda = atualizarRotacaoLibero(rotacaoliberoEsquerda, elemento.local)
						const liberoEsquerda = document.querySelector(`#JogadorEsquerda${elemento.local}`)
						liberoEsquerda.appendChild(jogadorDiv)
					} else {
						containerEsquerda.appendChild(jogadorDiv)
					}
				} else {
					// Verifica se é o libero, se for, adiciona o jogador junto ao jogador5
					if (index == 6) {
						rotacaoliberoDireita = atualizarRotacaoLibero(rotacaoliberoDireita, elemento.local)
						const liberoDireita = document.querySelector(`#JogadorDireita${elemento.local}`)
						liberoDireita.appendChild(jogadorDiv)
					} else {
						containerDireita.appendChild(jogadorDiv)
					}
				}
			} else {
				console.warn(`Jogador com ID ${elemento.idJogador} não encontrado no time completo.`)
			}
		})
	}
	// Verificar qual time é da esquerda e qual é da direita
	if (jogadoresTime1.idTime === timeEsquerda) {
		rotacaoliberoEsquerda=rotacaoLiberoT1
		rotacaoliberoDireita=rotacaoLiberoT2
		adicionarJogadores(jogadoresEmQuadraEsquerda, jogadoresTime1.Jogadors, "Esquerda", posiocaoLeftT1, posiocaoTopT1, posiocaoLiberoT1)
		adicionarJogadores(jogadoresEmQuadraDireita, jogadoresTime2.Jogadors, "Direita", posiocaoLeftT2, posiocaoTopT2, posiocaoLiberoT2)
	} else {
		rotacaoliberoEsquerda=rotacaoLiberoT2
		rotacaoliberoDireita=rotacaoLiberoT1
		adicionarJogadores(jogadoresEmQuadraDireita, jogadoresTime1.Jogadors, "Direita", posiocaoLeftT2, posiocaoTopT2, posiocaoLiberoT2)
		adicionarJogadores(jogadoresEmQuadraEsquerda, jogadoresTime2.Jogadors, "Esquerda", posiocaoLeftT1, posiocaoTopT1, posiocaoLiberoT1)
	}

	const JogadorEsquerda0 = document.getElementById("JogadorEsquerda0")
	const JogadorEsquerda1 = document.getElementById("JogadorEsquerda1")
	const JogadorEsquerda2 = document.getElementById("JogadorEsquerda2")
	const JogadorEsquerda3 = document.getElementById("JogadorEsquerda3")
	const JogadorEsquerda4 = document.getElementById("JogadorEsquerda4")
	const JogadorEsquerda5 = document.getElementById("JogadorEsquerda5")

	//Jogadores para substituição do time 02
	const JogadorDireita0 = document.getElementById("JogadorDireita0")
	const JogadorDireita1 = document.getElementById("JogadorDireita1")
	const JogadorDireita2 = document.getElementById("JogadorDireita2")
	const JogadorDireita3 = document.getElementById("JogadorDireita3")
	const JogadorDireita4 = document.getElementById("JogadorDireita4")
	const JogadorDireita5 = document.getElementById("JogadorDireita5")
}

function AtualizarDadosPartida(response) {
	const posicoes = response.data
	jogadoresEmQuadraEsquerda = []
	jogadoresEmQuadraDireita = []

	posicoes.forEach((posicao, index) => {
		const jogador = {
			idJogador: Number(posicao.idJogador),
			local: posicao.local
		}
		if (posicao.ladoQuadra === "Esquerda") {
			jogadoresEmQuadraEsquerda.push(jogador)
		} else if (posicao.ladoQuadra === "Direita") {
			jogadoresEmQuadraDireita.push(jogador)
		}
	})
}
function openModalSubstituicaoJogador(lado,idPosicaoJogador,jogadorId,jogadorEmQuadra){
	const modalSubstituicao = document.createElement("div")
	modalSubstituicao.id = `modalSubstituicaoJogador`
	modalSubstituicao.classList.add("modal")
	modalSubstituicao.innerHTML = `
			<div class="modal-content">
					<div class="modal-content-header">
							<h2>Substituição de jogador</h2>
							<h4 class="modalDescription">Escolha um jogador para substituir.</h4>
					</div>
					<div class="modal-body">
							<form id="selecaoJogadoresForm" enctype="multipart/form-data" class="form">
									<div class="group">
											<div id="subselectorContainer" class="subselector_container">
													<label for="timesCadastrados"><strong>Jogadores</strong></label>
													<div id="jogadoresSubistituicao"></div>
											</div>
									</div>
							</form>
					</div>
					<div class="modal-footer">
							<button id="btnFecharModalmodalSubstituicaoJogador" class="btn btn-cancel">Fechar</button>
							<button id="btnSalvarModalmodalSubstituicaoJogador" class="btn btn-primary">Salvar</button>
					</div>
			</div>
	`
	document.body.appendChild(modalSubstituicao)
	openModal("modalSubstituicaoJogador")
	renderizarSubstituicaoJogadores(lado,idPosicaoJogador,jogadorId,jogadorEmQuadra)
}
function renderizarSubstituicaoJogadores(lado, idPosicaoJogador, jogadorId, jogadorEmQuadra) {
	let JogadoresSubstituicao
	const container = document.getElementById("jogadoresSubistituicao")
	container.className = ''
	container.innerHTML = ''
	if (lado === "Esquerda") {
			container.classList.add("jogadoresSubistituicaoLadoEsquerdo")
			// Determinar qual time é da esquerda
			if (jogadoresTime1.idTime === timeEsquerda) {
					JogadoresSubstituicao = jogadoresTime1.Jogadors.filter(jogadorEstaEmQuadra)
			} else if (jogadoresTime2.idTime === timeEsquerda) {
					JogadoresSubstituicao = jogadoresTime2.Jogadors.filter(jogadorEstaEmQuadra)
			}
	} else {
			container.classList.add("jogadoresSubistituicaoLadoDireito")
			// Determinar qual time é da direita
			if (jogadoresTime1.idTime === timeDireita) {
					JogadoresSubstituicao = jogadoresTime1.Jogadors.filter(jogadorEstaEmQuadra)
			} else if (jogadoresTime2.idTime === timeDireita) {
					JogadoresSubstituicao = jogadoresTime2.Jogadors.filter(jogadorEstaEmQuadra)
			}
	}

	let jogadorSelecionado = null

	JogadoresSubstituicao.forEach((jogador) => {
			const jogadorDiv = document.createElement("div")
			jogadorDiv.id = `jogador${jogador.idJogador}`
			jogadorDiv.classList.add("bolinhaEscolhaJogadores")
			jogadorDiv.innerText = jogador.numeroCamiseta

			jogadorDiv.addEventListener("click", function() {
				// Verifica se outro jogador já estiver selecionado
			if (jogadorSelecionado && jogadorSelecionado !== this) {
				Swal.fire({
					icon: "error",
					title: "Você já selecionou o jogador",
					text: "Não é possível selecionar mais.",
					showConfirmButton: false,
					timer: 1500,
				})
			} else {
				this.classList.toggle("jogadorSelecionado")
				jogadorSelecionado = this.classList.contains("jogadorSelecionado") ? this : null
			}
		})
			container.appendChild(jogadorDiv)
	})
	
	function jogadorEstaEmQuadra(jogador) {
		return !jogadoresEmQuadraEsquerda.includes(jogador.idJogador) && !jogadoresEmQuadraDireita.includes(jogador.idJogador)
	}
}
function exibirMensagemVencedor(timeVencedor,set) {
  const isUltimoSet = set === partidaResponse.qtdeSets
  Swal.fire({
    title: 'Fim do Set!',
    text: `O time ${timeVencedor} venceu o ${set}º set!`,
    icon: 'success',
    showCancelButton: isUltimoSet,
		showConfirmButton: !isUltimoSet,
		allowOutsideClick: false,
    cancelButtonText: 'Finalizar Partida',
    confirmButtonText: 'Próximo Set',
  }).then((result) => {
    if (result.isConfirmed) {
      // Lógica para ir para o próximo set
			const saqueSet = partidaResponse.saqueInicial === partidaResponse.idTime1
			? partidaResponse.idTime2
			: partidaResponse.idTime1
			axios
			.post(
				`${url}ponto/next-set/${partidaID}`,
				{
					ladoQuadraTime2: partida.ladoQuadraTime1,
					ladoQuadraTime1: partida.ladoQuadraTime2,
					saqueInicial: saqueSet,
					set: partida.set++,
				},
				config
			)
			.then((response) => {
				partida = response
				renderizarPlacar(partidaResponse, partida)
				const newModelPartida = document.createElement("div")
				newModelPartida.id = `modalDefinicaoJogadores`
				newModelPartida.classList.add("modal")
				newModelPartida.innerHTML = `
					<div class="modal-content">
							<h2>Definição de jogadores titulares</h2>
							<div class="modal-body">
								<form id="selecaoJogadoresForm" enctype="multipart/form-data" class="form">
									<div class="group">
											<div id="subselectorContainer" class="subselector_container">
													<label for="timesCadastrados"><strong>${nomeTimeEsquerda}</strong></label>
													<div id="escolhaJogadoresLadoEsquerdo" class="escolhaJogadoresLadoEsquerdo"></div>
											</div>
									</div>

									<div class="group">
											<div id="subselectorContainer" class="subselector_container">
													<label for="timesCadastrados"><strong>${nomeTimeDireita}</strong></label>
													<div id="escolhaJogadoresLadoDireito" class="escolhaJogadoresLadoDireito"></div>
											</div>
									</div>

									<div class="group">
											<div id="subselectorContainer" class="subselector_container">
													<label for="timesCadastrados"><strong>Quadra final</strong></label>
													<div class="quadradejogo">
														<div class="volleyball-court">
															<div class="service-area left"></div>
															<div class="service-area right"></div>
															<div class="attack-area left"></div>
															<div class="attack-area right"></div>
															<div class="attack-line left"></div>
															<div class="attack-line right"></div>
															<div class="coach-box left"></div>
															<div class="coach-box right"></div>
															<div class="coach-box left bottom"></div>
															<div class="coach-box right bottom"></div>
															<div class="baseline"></div>
															<div class="net"></div>
														</div>
														<div class="quadraVolei">
															<div class="ballplayer">
																<div class="jogadoresTime01 quadra">
																	<div id="JogadorEsquerda0" class="bolinha" style="left: 10%; top: 78%;"></div>
																	<div id="JogadorEsquerda1" class="bolinha" style="left: 65%; top: 78%;"></div>
																	<div id="JogadorEsquerda2" class="bolinha" style="left: 65%; top: 40%;"></div>
																	<div id="JogadorEsquerda3" class="bolinha" style="left: 65%; top:  8%;"></div>
																	<div id="JogadorEsquerda4" class="bolinha" style="left: 10%; top:  8%;"></div>
																	<div id="JogadorEsquerda5" class="bolinha" style="left: 10%; top: 40%;"></div>
																	<div id="JogadorEsquerda6" class="bolinha libero" style="left: 10%; top: 55%;"></div>
																</div>
															</div>
															<div class="ballplayer">
																<div class="jogadoresTime02 quadra">
																	<div id="JogadorDireita0" class="bolinha2" style="left: 75%; top:  8%;"></div>
																	<div id="JogadorDireita1" class="bolinha2" style="left: 25%; top:  8%;"></div>
																	<div id="JogadorDireita2" class="bolinha2" style="left: 25%; top: 40%;"></div>
																	<div id="JogadorDireita3" class="bolinha2" style="left: 25%; top: 78%;"></div>
																	<div id="JogadorDireita4" class="bolinha2" style="left: 75%; top: 78%;"></div>
																	<div id="JogadorDireita5" class="bolinha2" style="left: 75%; top: 40%;"></div>
																	<div id="JogadorDireita6" class="bolinha2 libero" style="left: 85%; top: 55%;"></div>
																</div>
															</div>
														</div>
													</div>
											</div>
									</div>
								</form>
							</div>
							<div class="modal-footer">
									<button id="btnFecharModalmodalDefinicaoJogadores" class="btn btn-cancel" style="display: none">Fechar</button>
									<button id="btnSalvarModalmodalDefinicaoJogadores" class="btn btn-primary">Salvar</button>
							</div>
					</div>
				`

				document.body.appendChild(newModelPartida)
				renderizarJogadores(jogadoresTime1, jogadoresTime2, timeEsquerda, timeDireita)
				openModal("modalDefinicaoJogadores")
				// Evento para salvar os dados quando o usuário clica no botão "Salvar"
				document
					.getElementById("btnSalvarModalmodalDefinicaoJogadores")
					.addEventListener("click", function () {
						const dadosParaEnviarAPI =
							prepararDadosParaAPIDefinicaoJogadores()
						// Fazer uma solicitação POST para vincular jogadores em suas posições
						axios
							.post(`${url}posicao/create`, dadosParaEnviarAPI, config)
							.then((response) => {
								Swal.fire({
									icon: "success",
									title: "Jogadores vinculados com sucesso",
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									closeModal("modalDefinicaoJogadores")
									adicionarJogadoresTitularesEmQuadra(jogadoresTime1, jogadoresTime2, timeEsquerda, timeDireita, jogadoresEmQuadraEsquerda,jogadoresEmQuadraDireita)
								})
							})
							.catch((error) => {
								console.error(error)
								if (error.response) {
									const { data, status } = error.response
									Swal.fire({
										icon: "error",
										title: `${data.error}`,
										text: `Erro ${status} ` || "Erro desconhecido",
									})
								} else if (error.request) {
									// A solicitação foi feita, mas não houve resposta do servidor
									console.error("Sem resposta do servidor")
								} else {
									// Algo aconteceu durante a configuração da solicitação que acionou um erro
									console.error(
										"Erro na configuração da solicitação",
										error.message
									)
								}
							})
					})
			})
			.catch((error) => {
				console.error(error)
				if (error.response) {
					const { data, status } = error.response
					Swal.fire({
						icon: "error",
						title: `Erro ao atualizar ponto inicial da Partida.\n${data.error}`,
						text: `Erro ${status} ` || "Erro desconhecido",
					})
				} else if (error.request) {
					// A solicitação foi feita, mas não houve resposta do servidor
					console.error("Sem resposta do servidor")
				} else {
					// Algo aconteceu durante a configuração da solicitação que acionou um erro
					console.error(
						"Erro na configuração da solicitação",
						error.message
					)
				}
			})
    } else {
      // Lógica para finalizar a partida
    }
  })
}
function atualizarRotacaoLibero(rotacao, posicaoAtual) {	
	const index = rotacao.indexOf(posicaoAtual);

	if (index === -1) {
			console.warn(`Posição atual ${posicaoAtual} não encontrada na rotação.`);
			return rotacao;
	}

	// Reorganizar o array para que a posição atual fique no início
	let novaRotacao = rotacao.slice(index).concat(rotacao.slice(0, index));	
	/* // Ajustar o array para ficar uma casa a frente
	const lastElement = novaRotacao.shift();
	console.log("novaRotacao pop: ", novaRotacao);
	novaRotacao.push(lastElement);
	console.log("novaRotacao casa a frente: ", novaRotacao); */
	return novaRotacao;
}
