document.addEventListener("DOMContentLoaded", async () => {
    const dados = localStorage.getItem("dadosUsuario");
  
    dadosUsuario = JSON.parse(dados);

    if (
      dadosUsuario.message != "Essa conta não existe" &&
      dadosUsuario.message != "Senha incorreta"
    ) {
      const p = document.createElement("p");
      p.innerHTML = `Olá ${dadosUsuario.nome}`;
  
      document.body.appendChild(p);
    } else {
      alert(dadosUsuario.message);
      window.location.href = "../ENTRAR/index.html";
    }
});