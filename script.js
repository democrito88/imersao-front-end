document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-principal__entrar");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active"); // Alterna a classe 'active'
    });
});
