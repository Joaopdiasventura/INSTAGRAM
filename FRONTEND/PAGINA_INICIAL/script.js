document.addEventListener("DOMContentLoaded", async () => {
    const dados = localStorage.getItem("dadosUsuario");
  
    dadosUsuario = JSON.parse(dados);

    const p = document.createElement("p");
    p.innerHTML = `Olá ${dadosUsuario.nome}`;

    document.body.appendChild(p);
  
  });