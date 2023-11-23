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
		userInput.style.top = "55px";
	} else {
		userInput.style.visibility = "hidden";
		userInput.style.opacity = "0";
		userInput.style.top = "40px";
	}
});

var logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function () {
	// Redireciona para a página /logout
	window.location.href = "/logout";
});

// Adicione um ouvinte de evento para os itens de campeonato
document
	.getElementById("campeonatosContainer")
	.addEventListener("click", async function (event) {
		// Verifique se o clique foi em um item de campeonato
		if (event.target.closest(".cardDashboard_division")) {
			// Obtenha o ID do campeonato clicado
			const campeonatoId = event.target.closest(".cardDashboard_division").dataset.campeonatoId;
			//busca o token armazenado no login
			const token = localStorage.getItem('token');

			// Configurar o cabeçalho com a autorizção do token
			const config = {
				headers: {
					'Authorization': `Bearer ${token}`
				},
			};
			// Fazer uma solicitação GET para buscar as partidas do campeonato clicado
			axios.get(`${url}partida/${campeonatoId}`, config)
				.then((response) => {
					/* const partidas = await response.json(); */

					// Renderize as partidas no contêiner de partidas
					const partidasContainer = document.getElementById("partidasContainer");
					partidasContainer.innerHTML = ""; // Limpe o conteúdo anterior
					response.data.forEach((partida) => {
						const partidaElement = document.createElement("div");
						partidaElement.id = `partidas`;/* `partida_${partida.idPartida}` */
						partidaElement.classList.add("cardDashboard_division");
						partidaElement.innerHTML = `
							<div class="cardDashboard_division_image"></div>
							<div class="cardDashboard_division_content">
								<div class="cardDashboard_division_text">
									<span class="cardDashboard_division_name">Partida:
										${partida.rodada}</span>
									<p class="cardDashboard_division_username">${partida.nomeTime1}
										vs
										${partida.nomeTime2}</p>
								</div>
								<button class="painelws_Btn">
										<i class="ri-more-2-fill"></i>
										<div class="painelws_Btn_text">Opções</div>
									</button>
							</div>
						`;
						partidasContainer.appendChild(partidaElement);
					});
				})
				.catch((error) => {
					console.error(error);
					// Lida com erros, se necessário
				});
		}
	});
