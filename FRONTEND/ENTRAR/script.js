import req from "./requisicao.js";

let cod;

document
  .getElementById("registrar")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("emailr").value;

    const code = await req.sendEmail(email);

    cod = code.code;

    console.log(cod);

    document.getElementById("email").style.display = "flex";
  });

document.getElementById("emailc").addEventListener("submit", async (event) => {
  event.preventDefault();

  const code = document.getElementById("code").value;
  const name = document.getElementById("nome").value;
  const email = document.getElementById("emailr").value;
  const senha = document.getElementById("senhar").value;

  const result = await req.registrar(cod, code, name, email, senha);

  console.log(result);

  setTimeout(async () => {
    const logar = await req.logar(result.email, senha);

    localStorage.setItem('dadosUsuario', JSON.stringify(logar));

    window.location.href = "../PAGINA_INICIAL/index.html"

    console.log(logar);
  }, 1000);
});

document.getElementById("logar").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("emaill").value;
  const senha = document.getElementById("senhal").value;

  const logar = await req.logar(email, senha);

  localStorage.setItem('dadosUsuario', JSON.stringify(logar));

  window.location.href = "../PAGINA_INICIAL/index.html"

});

document.getElementById("senha2").addEventListener("keyup", () => {
  const senha = document.getElementById("senhar").value;
  const senha2 = document.getElementById("senha2").value;

  if (senha != senha2) {
    document.getElementById("enviar").style.display = "none";
    document.getElementById("msg").style.display = "flex";
  } else {
    document.getElementById("enviar").style.display = "flex";
    document.getElementById("msg").style.display = "none";
  }
});

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.getElementById("close").addEventListener("click", () => {
  document.getElementById("email").style.display = "none";
  document.getElementById("code").value = "";
});
