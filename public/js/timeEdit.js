// Função de validação do formulário
function validateForm(formData) {
	const name = formData.get("nomeTime");
	const file = formData.get("logoTime");

	// Validar campos preenchidos. Se algum campo estiver vazio, exibir mensagem de erro
	if (!name || !file) {
		// Exibir mensagem de erro para o usuário
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Por favor, preencha todos os campos obrigatórios!",
		});
		return false; // Impede o envio do formulário
	}

	// Função para validar a extensão da imagem
	function validateImageExtension(imageName) {
		const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
		const imageExtension = imageName.split(".").pop().toLowerCase();
		return allowedExtensions.includes(`.${imageExtension}`);
	}

	// Verificar se a imagem foi enviada via upload de arquivo
	if (file.name) {
		// Validar a extensão do arquivo
		if (!validateImageExtension(file.name)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "A imagem deve ser um arquivo de imagem válido [jpg, jpeg, png, gif]!",
			});
			return false;
		}
	} else {
		// Verificar se a imagem no HTML tem um nome válido
		const thumbnailElement = document.querySelector(".drop-zone__thumb");
		const imageName = thumbnailElement.dataset.imageName;

		if (!validateImageExtension(imageName)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "A imagem deve ser um arquivo de imagem válido [jpg, jpeg, png, gif]!",
			});
			return false;
		}
	}
	return true; // Todos os campos estão preenchidos corretamente
}
// Função para obeter o IdUsuario Do Seu LocalStorage
function obterIdUsuarioLocalStorage() {
	return localStorage.getItem("userId");
}

// Evento quando o botão "Salvar" de criação é clicado
document
	.querySelector("#saveTimeForm")
	.addEventListener("click", function () {
		// Obtenha o ID do time clicado
		const timeId = document.querySelector("#editarTimeForm").dataset
			.timeId;
		// Obter os dados do formulário de criação
		const formData = new FormData(
			document.querySelector("#editarTimeForm")
		);

		// Chama a função de validação antes de enviar a solicitação PUT
		if (validateForm(formData)) {
			const token = localStorage.getItem("token");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};
			const idUsuario = obterIdUsuarioLocalStorage();
			let data = {
				nomeTime: formData.get("nomeTime"),
				idUsuario: idUsuario,
			};
			const file = formData.get("logoTime");
			// Verificar se o campo logoTime está vazio
			if (file.name) {
				// Adicionar o campo idUsuario ao formData
				formData.append("idUsuario", idUsuario);
				// Alterar o cabeçalho Content-Type para multipart/form-data
				config.headers["Content-Type"] = "multipart/form-data";
				data = formData;
			}
			// Fazer uma solicitação PUT para atualizar o time
			axios
				.put(`${url}time/${timeId}`, data, config)
				.then((response) => {
					Swal.fire({
						icon: "success",
						title: "Time atualizado com sucesso",
						showConfirmButton: false,
						timer: 1500,
					}).then(() => {
						window.location.href = `/painelws`;//coreto seria /painelws/time/, painelws ate criar tela de times
					});
				})
				.catch((error) => {
					console.error(error);
					if (error.response) {
						const { data, status } = error.response;
						Swal.fire({
							icon: "error",
							title: `${data.message}`,
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

	const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
	const imageExtension = file.name.split(".").pop().toLowerCase();
	if (!allowedExtensions.includes(`.${imageExtension}`)) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "A imagem deve ser um arquivo de imagem válido [jpg, jpeg, png, gif]!",
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
