import req from "./requisicao.js";

document.addEventListener("DOMContentLoaded", async () => {
    const dados = localStorage.getItem("dadosUsuario");
    const dadosUsuario = JSON.parse(dados);

    if (!dadosUsuario || !dadosUsuario.email) {
        window.location.href = "../ENTRAR/index.html";
    }

    montarPerfil(dadosUsuario.nome, dadosUsuario.email, dadosUsuario.bio, dadosUsuario.foto);
    montarPostagens(dadosUsuario.email);
});

const montarPerfil = async (name, email, bio, url_foto) => {
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileBio = document.getElementById("profileBio");

    profileName.textContent = name;
    profileEmail.textContent = email;
    profileBio.textContent = bio;

    const addFotoForm = document.getElementById("addFoto");
    const fileInput = document.getElementById('file');
    const previewImage = document.getElementById('preview');

    previewImage.src = url_foto;

    addFotoForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const file = fileInput.files[0];

        if (file) {
            const allowedMimes = [
                "image/jpeg",
                "image/pjpeg",
                "image/png",
                "image/gif",
                "image/x-icon"
            ];

            if (allowedMimes.includes(file.type)) {
                const result = await req.adiconarFoto(file, email);
                console.log(result);
                previewImage.src = result.url_foto;
            } else {
                fileInput.value = '';
                alert('Por favor, selecione uma imagem válida.');
            }
        }
    });

    displayImage(); // Adicionar chamada para exibir a imagem atual do usuário
}

const montarPostagens = async (email) => {
    const result = await req.receberPosts(email);
    console.log(result[0]);
    const posts = document.querySelector(".posts");

    for (let i = 0; i < result[0].length; i++) {
        const post = document.createElement("div");
        const img = document.createElement("img");

        post.classList.add("post");
        img.src = result[0][i].url_imagem;

        post.appendChild(img)
        posts.appendChild(post);
    }
};

function displayImage() {
    const fileInput = document.getElementById('file');
    const previewImage = document.getElementById('preview');

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
