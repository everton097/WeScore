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
