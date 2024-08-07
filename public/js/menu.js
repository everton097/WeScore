hamburger = document.querySelector(".hamburger");
hamburger.onclick = function () {
	navbar = document.querySelector(".nav-bar");
	navbar.classList.toggle("active");
	hamburger = document.querySelector(".hamburger");
	hamburger.classList.toggle("active");
};

const activePage = window.location.pathname;
const navlinks = document.querySelectorAll("nav ul li a").forEach((link) => {
	if (link.pathname === activePage) {
		link.classList.add("acrive");
	}
});

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
	localStorage.removeItem("token");
	localStorage.removeItem("userId");
	localStorage.removeItem("userName");
	localStorage.removeItem("userMail");
	localStorage.removeItem("userLogo");
	// Redireciona para a página /logout
	window.location.href = "/logout";
});

// Função para abrir o modal
function openModal(idmodel,click) {
	const modal = document.getElementById(idmodel);
	modal.style.display = "flex";
	modal.classList.remove("modal-close");
	// Evento para fechar o modal quando o usuário clica no botão "Fechar"
	document
		.getElementById("btnFecharModal"+idmodel)
		.addEventListener("click", function () {
			closeModal(idmodel);
		});
		if (click) {
			// Evento para fechar o modal quando o usuário clica fora do conteúdo do modal
			modal.addEventListener("click", function (event) {
				if (event.target === modal) {
						closeModal(idmodel);
				}
		});
		}
}

// Função para fechar o modal
function closeModal(idmodel) {
	const modal = document.getElementById(idmodel);
	modal.classList.add("modal-close");
	// Espera a animação terminar antes de esconder o modal
	modal.addEventListener("animationend", function handleAnimationEnd() {
		modal.style.display = "none";
		modal.classList.remove("modal-close");
		modal.remove("animationend", handleAnimationEnd);
	});
}
