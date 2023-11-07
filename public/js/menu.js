hamburger = document.querySelector(".hamburger");
hamburger.onclick = function () {
  navbar = document.querySelector(".nav-bar");
  navbar.classList.toggle("active");
  hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("active");
};

const activePage = window.location.pathname;
const navlinks = document.querySelectorAll("nav ul li a").forEach((link) => {
  if(link.pathname === activePage){
    link.classList.add("acrive");
  }
});

