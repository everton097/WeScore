function subselector(idobjeto) {
	// Controle de estado para armazenar os IDs dos times selecionados
let selectedTimes = [];
const teste = document.querySelectorAll(`.time_active`);
teste.forEach(function (element) {
	selectedTimes.push(element.dataset.timeId);
});
console.log(selectedTimes);
  console.log(idobjeto);
	// Evento quando time é clicado
	document
		.getElementById(idobjeto)
		.addEventListener("click", async function (event) {
			// Obtenha o ID do time clicado
			const timeId = event.target.closest(".subselector").dataset.timeId;
      console.log(timeId);
			const timeElement = event.target.closest(".subselector");
      console.log(timeElement);
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
					showConfirmButton: false,
					timer: 1500,
				});
				return;
			}

			// Adicionar ou remover o time da lista de times selecionados
			if (isTimeActive && isSelected) {
				let partidaContainer;
				const defaultTime = `<div class="subselector_image"></div>
                          <div class="subselector_content">
                              <div class="subselector_name">
                                  <p class="subselector_nameTime">Escolha um time</p>
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
					console.log(partidaContainer);
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
					`.subselector[data-time-id="${timeId}"]`
				);
				const clone = time.cloneNode(true);
				// Obter apenas as divs internas do clone com as classes subselector_image e subselector_content
				const innerDivs = clone.querySelectorAll(
					".subselector_image, .subselector_content"
				);
				// Limpar o conteúdo do container antes de adicionar as divs internas
				partidaContainer.innerHTML = "";

				// Adicionar as divs internas ao container de partida
				innerDivs.forEach((div) => {
					partidaContainer.appendChild(div.cloneNode(true));
				});
			}
		});
}
