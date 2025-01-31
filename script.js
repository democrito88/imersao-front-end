document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-principal__entrar");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active"); // Alterna a classe 'active'
    });

    const inputBusca = document.querySelector("#busca");

    inputBusca.addEventListener("input", (e) => {
        const entrada = e.target.value;

        const divResultados = document.querySelector("#resultados");
        divResultados.innerHTML = "";

        if(entrada != ""){
            fetch("./api.json")
            .then(resultado => resultado.json())
            .then(titulos => {
                const resultados = titulos.filter(titulo => includesCaseInsensitive(titulo.nome, entrada) || includesCaseInsensitive(titulo.artista, entrada));
                mostraResultadosBusca(resultados);
            })
            .catch(error => console.error(error))
        }


    });

    inputBusca.addEventListener("blur", escodeResultadosBusca);
});

function mostraResultadosBusca(resultados){
    const ul = document.createElement("ul");

    const lis = resultados.forEach(titulo => ul.insertAdjacentHTML('beforeend', "<li>" +
        `<img src='${titulo.capa}' width="40">` +
        `<span class="titulo-nome">${titulo.nome}</span>` +
        `<span>${titulo.artista}</span>` +
        `</li>`
    ));
    
    const divResultados = document.querySelector("#resultados");
    divResultados.classList.remove("invisivel");
    divResultados.appendChild(ul);
}

function escodeResultadosBusca(){
    const divResultados = document.querySelector("#resultados");
    divResultados.classList.add("invisivel");
}

const includesCaseInsensitive = (str, searchString) =>
    new RegExp(searchString, 'i').test(str);
