let countTime01 = 0,
	intervalIDTime01 = 0,
	controlet1 = "semponto",
	rotacaot1 = "mantem";

let countTime02 = 0,
	intervalIDTime02 = 0,
	controlet2 = "semponto",
	rotacaot2 = "mantem";

let timeDireita = 0,
	timeEsquerda = 0,
	nomeTimeDireita = "",
	nomeTimeEsquerda = "";
// Controle de estado para armazenar os IDs dos times selecionados
let selectedTimes = [],
	partida = {},
	jogadoresEmQuadraDireita = [],
	jogadoresEmQuadraEsquerda = [];

const partidaID = document.getElementById("idPartida").dataset.partidaId;
if (partidaID) {
	// busca o token armazenado no login
	var token = localStorage.getItem("token");
	// Configurar o cabeçalho com a autorização do token
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};
	// Fazer uma solicitação GET para recuperar ultimo ponto da partida
	axios
		.get(`${url}ponto/last/${partidaID}`, config)
		.then((response) => {
			partida = response.data;
			if (
				partida.ptTime1 === 0 &&
				partida.ptTime2 === 0 &&
				partida.set === 1 &&
				partida.idTime === null &&
				partida.ladoQuadraTime1 === null &&
				partida.ladoQuadraTime2 === null &&
				partida.saqueInicial === null
			) {
				const newModelPartida = document.createElement("div");
				newModelPartida.id = `modalDefinicaoLado`;
				newModelPartida.classList.add("modal");
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
									<button id="btnFecharModal" class="btn btn-cancel">Fechar</button>
									<button id="btnSalvarModal" class="btn btn-primary">Salvar</button>
							</div>
					</div>
				`;

				document.body.appendChild(newModelPartida);
				openModal("modalDefinicaoLado");
				subselector("subselectorContainer");
				submultselector();
				// Evento para salvar os dados quando o usuário clica no botão "Salvar"
				document
					.getElementById("btnSalvarModal")
					.addEventListener("click", function () {
						const dadosParaEnviarAPI = prepararDadosParaAPI(
							partidaResponse,
							selectedTimes
						);
						partida.ladoQuadraTime1 = dadosParaEnviarAPI.ladoQuadraTime1;
						partida.ladoQuadraTime2 = dadosParaEnviarAPI.ladoQuadraTime2;
						partida.saqueInicial = dadosParaEnviarAPI.saqueInicial;

						renderizarPlacar(partidaResponse, partida);

						// Fazer uma atualização PUT para atualizar o ponto inicial da partida
						axios
							.put(
								`${url}ponto/initial/${partidaID}`,
								dadosParaEnviarAPI,
								config
							)
							.then((response) => {
								closeModal("modalDefinicaoLado");
								renderizarPlacar(partidaResponse, partida);
								const newModelPartida = document.createElement("div");
								newModelPartida.id = `modalDefinicaoJogadores`;
								newModelPartida.classList.add("modal");
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
																					<div id="JogadorEsquerda3" class="bolinha" style="left: 65%; top: 8%;"></div>
																					<div id="JogadorEsquerda4" class="bolinha" style="left: 10%; top: 8%;"></div>
																					<div id="JogadorEsquerda5" class="bolinha" style="left: 10%; top: 40%;"></div>
																				</div>
																			</div>
																			<div class="ballplayer">
																				<div class="jogadoresTime02 quadra">
																					<div id="JogadorDireita0" class="bolinha2" style="left: 75%; top: 8%;"></div>
																					<div id="JogadorDireita1" class="bolinha2" style="left: 75%; top: 40%;"></div>
																					<div id="JogadorDireita2" class="bolinha2" style="left: 75%; top: 78%;"></div>
																					<div id="JogadorDireita3" class="bolinha2" style="left: 25%; top: 78%;"></div>
																					<div id="JogadorDireita4" class="bolinha2" style="left: 25%; top: 40%;"></div>
																					<div id="JogadorDireita5" class="bolinha2" style="left: 25%; top: 8%;"></div>
																				</div>
																			</div>
																		</div>
																	</div>
															</div>
													</div>
												</form>
											</div>
											<div class="modal-footer">
													<button id="btnFecharModal" class="btn btn-cancel">Fechar</button>
													<button id="btnSalvarModal" class="btn btn-primary">Salvar</button>
											</div>
									</div>
								`;

								document.body.appendChild(newModelPartida);
								renderizarJogadores(jogadoresTime1, jogadoresTime2);
								openModal("modalDefinicaoJogadores");
							})
							.catch((error) => {
								console.error(error);
								if (error.response) {
									const { data, status } = error.response;
									Swal.fire({
										icon: "error",
										title: `Erro ao atualizar ponto inicial da Partida.\n${data.error}`,
										text: `Erro ${status} ` || "Erro desconhecido",
									});
								} else if (error.request) {
									// A solicitação foi feita, mas não houve resposta do servidor
									console.error("Sem resposta do servidor");
								} else {
									// Algo aconteceu durante a configuração da solicitação que acionou um erro
									console.error(
										"Erro na configuração da solicitação",
										error.message
									);
								}
							});
					});
			} else {
				countTime01 = partida.ptTime1;
				countTime02 = partida.ptTime2;
				updateValueTime01();
				updateValueTime02();
				renderizarPlacar(partidaResponse, partida);

				console.log("Partida antiga!");
				console.log("Partida", partida);
				console.log("Response", partidaResponse);
				console.log(timeDireita);
				console.log(timeEsquerda);
				console.log(nomeTimeDireita);
				console.log(nomeTimeEsquerda);
			}
		})
		.catch((error) => {
			console.error(error);
			if (error.response) {
				const { data, status } = error.response;
				Swal.fire({
					icon: "error",
					title: `Erro ao Recuperar pontos de Partida.\n${data.error}`,
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

const valueTime01 = document.getElementById("valueTime01");
const plusButtonTime01 = document.getElementById("plusTime01");
const minusButtonTime01 = document.getElementById("minusTime01");
const bola01 = document.getElementById("bolavolei01").style.opacity;
//Time a ser substituido
const subsTime01 = document.getElementById("subistituicaoTime01");
const subsTime02 = document.getElementById("subistituicaoTime02");
//Computar o estilo do css
const compStylesSubsTime02 = window.getComputedStyle(subsTime01);
const compStylesSubsTime01 = window.getComputedStyle(subsTime02);
//Jogadores para substituição do time 01
/* const subsJogadorEsquerda0 = document.getElementById("JogadorEsquerda0");
const subsJogadorEsquerda1 = document.getElementById("JogadorEsquerda1");
const subsJogadorEsquerda2 = document.getElementById("JogadorEsquerda2");
const subsJogadorEsquerda3 = document.getElementById("JogadorEsquerda3");
const subsJogadorEsquerda4 = document.getElementById("JogadorEsquerda4");
const subsJogadorEsquerda5 = document.getElementById("JogadorEsquerda5");
//Jogadores para substituição do time 02
const subsJogadorDireita0 = document.getElementById("JogadorDireita0");
const subsJogadorDireita1 = document.getElementById("JogadorDireita1");
const subsJogadorDireita2 = document.getElementById("JogadorDireita2");
const subsJogadorDireita3 = document.getElementById("JogadorDireita3");
const subsJogadorDireita4 = document.getElementById("JogadorDireita4");
const subsJogadorDireita5 = document.getElementById("JogadorDireita5"); */
//recupera o Card de Substituição
const statusDisplayCard = document.getElementById("popupcard");
//Computar o estilo do css
const compStyles = window.getComputedStyle(statusDisplayCard);
const closecard = document.getElementById("closecard");

const AlterStatusCard = (time) => {
	if (time == "time01") {
		document.getElementById("subistituicaoTime02").style.display = "none";
		document.getElementById("subistituicaoTime01").style.display = "flex";
	} else if (time == "time02") {
		document.getElementById("subistituicaoTime01").style.display = "none";
		document.getElementById("subistituicaoTime02").style.display = "flex";
	}
	if (compStyles.display == "none") {
		document.getElementById("popupcard").style.display = "flex";
	} else if (compStyles.display == "flex") {
		document.getElementById("popupcard").style.display = "none";
	}
};
closecard.addEventListener("click", () => {
	AlterStatusCard();
});
/* //Jogadores para substituição do time 01
subsJogadorEsquerda5.addEventListener("click", () => {
	AlterStatusCard("time01");
});
subsJogadorEsquerda4.addEventListener("click", () => {
	AlterStatusCard("time01");
});
subsJogadorEsquerda3.addEventListener("click", () => {
	AlterStatusCard("time01");
});
subsJogadorEsquerda2.addEventListener("click", () => {
	AlterStatusCard("time01");
});
subsJogadorEsquerda1.addEventListener("click", () => {
	AlterStatusCard("time01");
});
subsJogadorEsquerda0.addEventListener("click", () => {
	AlterStatusCard("time01");
	//document.getElementById("popupcard").style.display = "flex";
});
//Jogadores para substituição do time 02
subsJogadorDireita5.addEventListener("click", () => {
	AlterStatusCard("time02");
});
subsJogadorDireita4.addEventListener("click", () => {
	AlterStatusCard("time02");
});
subsJogadorDireita3.addEventListener("click", () => {
	AlterStatusCard("time02");
});
subsJogadorDireita2.addEventListener("click", () => {
	AlterStatusCard("time02");
});
subsJogadorDireita1.addEventListener("click", () => {
	AlterStatusCard("time02");
});
subsJogadorDireita0.addEventListener("click", () => {
	AlterStatusCard("time02");
	//document.getElementById("popupcard").style.display = "flex";
}); */

const updateValueTime01 = () => {
	if (countTime01 <= 9) {
		valueTime01.innerHTML = "0" + countTime01;
	} else if (countTime01 > 9) {
		valueTime01.innerHTML = countTime01;
		if (countTime01 > 24 && countTime01 >= countTime02 + 2) {
			console.log("time 1 ganhou");
		}
	}
};
const updateBola01 = () => {
	document.getElementById("bolavolei01").style.opacity = "1";
	document.getElementById("bolavolei02").style.opacity = "0";
};
const updateBola02 = () => {
	document.getElementById("bolavolei01").style.opacity = "0";
	document.getElementById("bolavolei02").style.opacity = "1";
};

const valueTime02 = document.getElementById("valueTime02");
const plusButtonTime02 = document.getElementById("plusTime02");
const minusButtonTime02 = document.getElementById("minusTime02");
const updateValueTime02 = () => {
	if (countTime02 <= 9) {
		valueTime02.innerHTML = "0" + countTime02;
	} else if (countTime02 > 9) {
		valueTime02.innerHTML = countTime02;
		if (countTime02 > 24 && countTime02 >= countTime01 + 2) {
			console.log("time 2 ganhou");
		}
	}
};

plusButtonTime01.addEventListener("click", () => {
	if (countTime01 >= 0 && countTime01 < 40) {
		countTime01 += 1;
		updateTime01();
		updateValueTime01();
		updateBola01();
		controlet1 = "ponto";
		controlet2 = "semponto";
	}
});
// Adicione um ouvinte de evento ao documento
document.addEventListener("keydown", () => {
	// Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
	if (countTime01 >= 0 && countTime01 < 40 && event.key === "q") {
		countTime01 += 1;
		updateTime01();
		updateValueTime01();
		updateBola01();
		controlet1 = "ponto";
		controlet2 = "semponto";
	}
});
plusButtonTime01.addEventListener("mousedown", () => {
	if (countTime01 >= 0 && countTime01 < 40) {
		intervalIDTime01 = setInterval(() => {
			countTime01 += 1;
			updateTime01();
			updateValueTime01();
			updateBola01();
			controlet1 = "ponto";
			controlet2 = "semponto";
			if (countTime01 == 40) {
				clearInterval(intervalIDTime01);
			}
		}, 200);
	}
});
minusButtonTime01.addEventListener("click", () => {
	console.log(countTime01, countTime02); //Chamda de rota redução ponto api
	if (countTime01 > 0 && countTime01 <= 40) {
		countTime01 -= 1;
		updateMenusTime01();
		updateValueTime01();
	}
});
document.addEventListener("keydown", () => {
	// Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
	if (countTime01 > 0 && countTime01 <= 40 && event.key === "a") {
		countTime01 -= 1;
		updateMenusTime01();
		updateValueTime01();
	}
});
minusButtonTime01.addEventListener("mousedown", () => {
	if (countTime01 > 0 && countTime01 <= 40) {
		intervalIDTime01 = setInterval(() => {
			countTime01 -= 1;
			updateMenusTime01();
			updateValueTime01();
			if (countTime01 == 40 || countTime01 == 0) {
				clearInterval(intervalIDTime01);
			}
		}, 200);
	}
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime01));

var posiocaoLeftT1 = [0, 0, 55, 55, 55, 0];
var posiocaoTopT1 = [37.5, 2, 2, 37.5, 75, 75];

/* const JogadorEsquerda0 = document.querySelector("#JogadorEsquerda0");
const JogadorEsquerda1 = document.querySelector("#JogadorEsquerda1");
const JogadorEsquerda2 = document.querySelector("#JogadorEsquerda2");
const JogadorEsquerda3 = document.querySelector("#JogadorEsquerda3");
const JogadorEsquerda4 = document.querySelector("#JogadorEsquerda4");
const JogadorEsquerda5 = document.querySelector("#JogadorEsquerda5");

JogadorEsquerda0.style.left = `${posiocaoLeftT1[5]}%`;
JogadorEsquerda0.style.top = `${posiocaoTopT1[5]}%`;
JogadorEsquerda1.style.left = `${posiocaoLeftT1[4]}%`;
JogadorEsquerda1.style.top = `${posiocaoTopT1[4]}%`;
JogadorEsquerda2.style.left = `${posiocaoLeftT1[3]}%`;
JogadorEsquerda2.style.top = `${posiocaoTopT1[3]}%`;
JogadorEsquerda3.style.left = `${posiocaoLeftT1[2]}%`;
JogadorEsquerda3.style.top = `${posiocaoTopT1[2]}%`;
JogadorEsquerda4.style.left = `${posiocaoLeftT1[1]}%`;
JogadorEsquerda4.style.top = `${posiocaoTopT1[1]}%`;
JogadorEsquerda5.style.left = `${posiocaoLeftT1[0]}%`;
JogadorEsquerda5.style.top = `${posiocaoTopT1[0]}%`; */

const updateTime01 = () => {
	if (controlet1 == "semponto" && rotacaot1 == "mantem") {
		//Altera posição dos jogadores.
		moveLeft(posiocaoLeftT1);
		moveLeft(posiocaoTopT1);

		JogadorEsquerda0.style.left = `${posiocaoLeftT1[5]}%`;
		JogadorEsquerda0.style.top = `${posiocaoTopT1[5]}%`;
		JogadorEsquerda1.style.left = `${posiocaoLeftT1[4]}%`;
		JogadorEsquerda1.style.top = `${posiocaoTopT1[4]}%`;
		JogadorEsquerda2.style.left = `${posiocaoLeftT1[3]}%`;
		JogadorEsquerda2.style.top = `${posiocaoTopT1[3]}%`;
		JogadorEsquerda3.style.left = `${posiocaoLeftT1[2]}%`;
		JogadorEsquerda3.style.top = `${posiocaoTopT1[2]}%`;
		JogadorEsquerda4.style.left = `${posiocaoLeftT1[1]}%`;
		JogadorEsquerda4.style.top = `${posiocaoTopT1[1]}%`;
		JogadorEsquerda5.style.left = `${posiocaoLeftT1[0]}%`;
		JogadorEsquerda5.style.top = `${posiocaoTopT1[0]}%`;
		rotacaot1 = "rotacionou";
		rotacaot2 = "mantem";
	} else {
		rotacaot1 = "mantem";
	}
};
const updateMenusTime01 = () => {
	if (controlet1 == "ponto" && rotacaot1 == "rotacionou") {
		//Altera posição dos jogadores.
		moveRight(posiocaoLeftT1);
		moveRight(posiocaoTopT1);
		JogadorEsquerda0.style.left = `${posiocaoLeftT1[5]}%`;
		JogadorEsquerda0.style.top = `${posiocaoTopT1[5]}%`;
		JogadorEsquerda1.style.left = `${posiocaoLeftT1[4]}%`;
		JogadorEsquerda1.style.top = `${posiocaoTopT1[4]}%`;
		JogadorEsquerda2.style.left = `${posiocaoLeftT1[3]}%`;
		JogadorEsquerda2.style.top = `${posiocaoTopT1[3]}%`;
		JogadorEsquerda3.style.left = `${posiocaoLeftT1[2]}%`;
		JogadorEsquerda3.style.top = `${posiocaoTopT1[2]}%`;
		JogadorEsquerda4.style.left = `${posiocaoLeftT1[1]}%`;
		JogadorEsquerda4.style.top = `${posiocaoTopT1[1]}%`;
		JogadorEsquerda5.style.left = `${posiocaoLeftT1[0]}%`;
		JogadorEsquerda5.style.top = `${posiocaoTopT1[0]}%`;
		controlet1 = "semponto";
		rotacaot1 = "mantem";
		rotacaot2 = "rotacionou";
	}
};
//Time 02

plusButtonTime02.addEventListener("click", () => {
	if (countTime02 >= 0 && countTime02 < 40) {
		countTime02 += 1;
		updateTime02();
		updateValueTime02();
		updateBola02();
		controlet2 = "ponto";
		controlet1 = "semponto";
	}
});
// Adicione um ouvinte de evento ao documento
document.addEventListener("keydown", () => {
	// Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
	if (countTime02 >= 0 && countTime02 < 40 && event.key === "e") {
		countTime02 += 1;
		updateTime02();
		updateValueTime02();
		updateBola02();
		controlet2 = "ponto";
		controlet1 = "semponto";
	}
});
plusButtonTime02.addEventListener("mousedown", () => {
	if (countTime02 >= 0 && countTime02 < 40) {
		intervalIDTime02 = setInterval(() => {
			countTime02 += 1;
			updateTime02();
			updateValueTime02();
			updateBola02();
			controlet2 = "ponto";
			controlet1 = "semponto";
			if (countTime02 == 40) {
				clearInterval(intervalIDTime02);
			}
		}, 200);
	}
});
minusButtonTime02.addEventListener("click", () => {
	if (countTime02 > 0 && countTime02 <= 40) {
		countTime02 -= 1;
		updateMenusTime02();
		updateValueTime02();
	}
});
document.addEventListener("keydown", () => {
	// Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
	if (countTime02 > 0 && countTime02 <= 40 && event.key === "d") {
		countTime02 -= 1;
		updateMenusTime02();
		updateValueTime02();
	}
});
minusButtonTime02.addEventListener("mousedown", () => {
	if (countTime02 > 0 && countTime02 <= 40) {
		intervalIDTime02 = setInterval(() => {
			countTime02 -= 1;
			updateMenusTime02();
			updateValueTime02();
			if (countTime02 == 40 || countTime02 == 0) {
				clearInterval(intervalIDTime02);
			}
		}, 200);
	}
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime02));

/* var posiocaoLeftT2 = [75, 75, 75, 25, 25, 25];
var posiocaoTopT2 = [0, 37.5, 75, 75, 37.5, 0];
const JogadorDireita0 = document.querySelector("#JogadorDireita0");
const JogadorDireita1 = document.querySelector("#JogadorDireita1");
const JogadorDireita2 = document.querySelector("#JogadorDireita2");
const JogadorDireita3 = document.querySelector("#JogadorDireita3");
const JogadorDireita4 = document.querySelector("#JogadorDireita4");
const JogadorDireita5 = document.querySelector("#JogadorDireita5");

JogadorDireita0.style.left = `${posiocaoLeftT2[0]}%`;
JogadorDireita0.style.top = `${posiocaoTopT2[0]}%`;
JogadorDireita1.style.left = `${posiocaoLeftT2[1]}%`;
JogadorDireita1.style.top = `${posiocaoTopT2[1]}%`;
JogadorDireita2.style.left = `${posiocaoLeftT2[2]}%`;
JogadorDireita2.style.top = `${posiocaoTopT2[2]}%`;
JogadorDireita3.style.left = `${posiocaoLeftT2[3]}%`;
JogadorDireita3.style.top = `${posiocaoTopT2[3]}%`;
JogadorDireita4.style.left = `${posiocaoLeftT2[4]}%`;
JogadorDireita4.style.top = `${posiocaoTopT2[4]}%`;
JogadorDireita5.style.left = `${posiocaoLeftT2[5]}%`;
JogadorDireita5.style.top = `${posiocaoTopT2[5]}%`; */

const updateTime02 = () => {
	if (controlet2 == "semponto" && rotacaot2 == "mantem") {
		//Altera posição dos jogadores.
		moveLeft(posiocaoLeftT2);
		moveLeft(posiocaoTopT2);

		JogadorDireita0.style.left = `${posiocaoLeftT2[0]}%`;
		JogadorDireita0.style.top = `${posiocaoTopT2[0]}%`;
		JogadorDireita1.style.left = `${posiocaoLeftT2[1]}%`;
		JogadorDireita1.style.top = `${posiocaoTopT2[1]}%`;
		JogadorDireita2.style.left = `${posiocaoLeftT2[2]}%`;
		JogadorDireita2.style.top = `${posiocaoTopT2[2]}%`;
		JogadorDireita3.style.left = `${posiocaoLeftT2[3]}%`;
		JogadorDireita3.style.top = `${posiocaoTopT2[3]}%`;
		JogadorDireita4.style.left = `${posiocaoLeftT2[4]}%`;
		JogadorDireita4.style.top = `${posiocaoTopT2[4]}%`;
		JogadorDireita5.style.left = `${posiocaoLeftT2[5]}%`;
		JogadorDireita5.style.top = `${posiocaoTopT2[5]}%`;
		rotacaot2 = "rotacionou";
		rotacaot1 = "mantem";
	} else {
		rotacaot2 = "mantem";
	}
};
const updateMenusTime02 = () => {
	if (controlet2 == "ponto" && rotacaot2 == "rotacionou") {
		//Altera posição dos jogadores.
		moveRight(posiocaoLeftT2);
		moveRight(posiocaoTopT2);

		JogadorDireita0.style.left = `${posiocaoLeftT2[0]}%`;
		JogadorDireita0.style.top = `${posiocaoTopT2[0]}%`;
		JogadorDireita1.style.left = `${posiocaoLeftT2[1]}%`;
		JogadorDireita1.style.top = `${posiocaoTopT2[1]}%`;
		JogadorDireita2.style.left = `${posiocaoLeftT2[2]}%`;
		JogadorDireita2.style.top = `${posiocaoTopT2[2]}%`;
		JogadorDireita3.style.left = `${posiocaoLeftT2[3]}%`;
		JogadorDireita3.style.top = `${posiocaoTopT2[3]}%`;
		JogadorDireita4.style.left = `${posiocaoLeftT2[4]}%`;
		JogadorDireita4.style.top = `${posiocaoTopT2[4]}%`;
		JogadorDireita5.style.left = `${posiocaoLeftT2[5]}%`;
		JogadorDireita5.style.top = `${posiocaoTopT2[5]}%`;
		controlet2 = "semponto";
		rotacaot2 = "mantem";
		rotacaot1 = "rotacionou";
	}
};

// Função para mover os elementos do vetor para a direita
function moveRight(arr) {
	const lastElement = arr.pop();
	arr.unshift(lastElement);
}

// Função para mover os elementos do vetor para a esquerda
function moveLeft(arr) {
	const firstElement = arr.shift();
	arr.push(firstElement);
}
// Obtenha todos os botões com atributo 'data-target'
const alterCards = document.querySelectorAll("[data-target]");

// Adicione um evento de clique a cada botão
alterCards.forEach((alterCard) => {
	alterCard.addEventListener("click", () => {
		// Oculte todos os elementos
		document
			.querySelectorAll("#cartoes, #quadradejogos, #substituicao")
			.forEach((element) => {
				element.style.display = "none";
			});

		// Mostre o elemento correspondente com base no atributo 'data-target'
		const targetId = alterCard.getAttribute("data-target");
		document.getElementById(targetId).style.display = "block";
	});
});

// Fução para renderizar placar de acordo com escolha de lados
function renderizarPlacar(partidaResponse, partida) {
	const isTime1Esquerda = partida.ladoQuadraTime1 === "Esquerda";
	// Definir os dados do time da esquerda
	timeEsquerda = isTime1Esquerda
		? partidaResponse.idTime1
		: partidaResponse.idTime2;
	nomeTimeEsquerda = isTime1Esquerda
		? partidaResponse.nomeTime1
		: partidaResponse.nomeTime2;
	const logoTimeEsquerda = isTime1Esquerda
		? partidaResponse.logoTime1
		: partidaResponse.logoTime2;
	timeDireita = isTime1Esquerda
		? partidaResponse.idTime2
		: partidaResponse.idTime1;
	nomeTimeDireita = isTime1Esquerda
		? partidaResponse.nomeTime2
		: partidaResponse.nomeTime1;
	const logoTimeDireita = isTime1Esquerda
		? partidaResponse.logoTime2
		: partidaResponse.logoTime1;

	// Atualizar os elementos no DOM
	document.getElementById(
		"logoTimeEsquerda"
	).src = `http://localhost:3001/public/upload/img/time/${logoTimeEsquerda}`;
	document.getElementById("nomeTimeEsquerda").innerText = nomeTimeEsquerda;
	document.getElementById(
		"logoTimeDireita"
	).src = `http://localhost:3001/public/upload/img/time/${logoTimeDireita}`;
	document.getElementById("nomeTimeDireita").innerText = nomeTimeDireita;

	// Definir os pontos dos times
	if (isTime1Esquerda) {
		countTime01 = partida.ptTime1;
		countTime02 = partida.ptTime2;
	} else {
		countTime01 = partida.ptTime2;
		countTime02 = partida.ptTime1;
	}

	// Verificar o saque inicial ou o ID do time
	const timeSaque = partida.idTime || partida.saqueInicial;

	if (timeEsquerda === timeSaque) {
		updateBola01();
	} else if (timeDireita === timeSaque) {
		updateBola02();
	}

	updateValueTime01();
	updateValueTime02();
}
// Função para encontrar os lados e preparar os dados para a API
function prepararDadosParaAPI(partidaResponse, selectedTimes) {
	const idTimeSelecionado1 = selectedTimes[0];
	const idTimeSelecionado2 = selectedTimes[1];
	let ladoQuadraTime1, ladoQuadraTime2;
	if (
		partidaResponse.idTime1.toString() === idTimeSelecionado1 &&
		partidaResponse.idTime2.toString() === idTimeSelecionado2
	) {
		ladoQuadraTime1 = "Esquerda";
		ladoQuadraTime2 = "Direita";
	} else {
		ladoQuadraTime1 = "Direita";
		ladoQuadraTime2 = "Esquerda";
	}

	// Preparar objeto para enviar à API
	const dadosParaAPI = {
		idPartida: partidaResponse.idPartida,
		ladoQuadraTime1,
		ladoQuadraTime2,
		saqueInicial: parseInt(selectedTimes[2]),
	};
	return dadosParaAPI;
}
function renderizarJogadores(jogadoresTime1, jogadoresTime2) {
	// Limpar as divs antes de adicionar novos jogadores
	document.getElementById("escolhaJogadoresLadoEsquerdo").innerHTML = "";
	document.getElementById("escolhaJogadoresLadoDireito").innerHTML = "";

	// Função auxiliar para adicionar jogadores ao lado correto
	function adicionarJogadores(lado, jogadores, arrayLado, ladojogador) {
		const container = document.getElementById(lado);
		jogadores.forEach((jogador) => {
			const jogadorDiv = document.createElement("div");
			jogadorDiv.id = `jogador${jogador.idJogador}`;
			jogadorDiv.classList.add("bolinhaEscolhaJogadores");
			jogadorDiv.innerText = jogador.numeroCamiseta;

			// Adicionar ouvinte de clique
			jogadorDiv.addEventListener("click", () => {
				console.log(arrayLado.length);

				if (arrayLado.includes(jogador.numeroCamiseta)) {
					// Se já estiver no array, remover
					arrayLado.splice(arrayLado.indexOf(jogador.numeroCamiseta), 1);
					jogadorDiv.classList.remove("jogadorSelecionado");
					document.querySelector(
						`#Jogador${ladojogador}${arrayLado.length}`
					).innerHTML = "";
				} else {
					// Verificar se o usuário está tentando selecionar mais que 6 jogadores para o time
					if (arrayLado.length > 5) {
						// Exibir mensagem de erro
						Swal.fire({
							icon: "error",
							title: `Você já selecionou 6 jogadores`,
							text: `Não é possível selecionar mais.`,
							showConfirmButton: false,
							timer: 2500,
						});
						return;
					}
					// Se não estiver no array, adicionar
					document.querySelector(
						`#Jogador${ladojogador}${arrayLado.length}`
					).innerHTML = `${jogador.numeroCamiseta}`;
					arrayLado.push(jogador.numeroCamiseta);
					jogadorDiv.classList.add("jogadorSelecionado");
				}
				console.log("Esquerda:", jogadoresEmQuadraEsquerda); // Verificar jogadores adicionados
				console.log("Direita:", jogadoresEmQuadraDireita); // Verificar jogadores adicionados
			});

			container.appendChild(jogadorDiv);
		});
	}

	// Verificar e adicionar jogadores do time 1
	if (jogadoresTime1.idTime === timeEsquerda) {
		adicionarJogadores(
			"escolhaJogadoresLadoEsquerdo",
			jogadoresTime1.Jogadors,
			jogadoresEmQuadraEsquerda,
			"Esquerda"
		);
	} else if (jogadoresTime1.idTime === timeDireita) {
		adicionarJogadores(
			"escolhaJogadoresLadoDireito",
			jogadoresTime1.Jogadors,
			jogadoresEmQuadraDireita,
			"Direita"
		);
	}

	// Verificar e adicionar jogadores do time 2
	if (jogadoresTime2.idTime === timeEsquerda) {
		adicionarJogadores(
			"escolhaJogadoresLadoEsquerdo",
			jogadoresTime2.Jogadors,
			jogadoresEmQuadraEsquerda,
			"Esquerda"
		);
	} else if (jogadoresTime2.idTime === timeDireita) {
		adicionarJogadores(
			"escolhaJogadoresLadoDireito",
			jogadoresTime2.Jogadors,
			jogadoresEmQuadraDireita,
			"Direita"
		);
	}
}

function escolhaJogadores() {
	closeModal("modalDefinicaoLado");
	renderizarPlacar(partidaResponse, partida);
	const newModelPartida = document.createElement("div");
	newModelPartida.id = `modalDefinicaoJogadores`;
	newModelPartida.classList.add("modal");
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
								`;

	document.body.appendChild(newModelPartida);
	renderizarJogadores(jogadoresTime1, jogadoresTime2);
	openModal("modalDefinicaoJogadores");
}
