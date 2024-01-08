import req from "./requisicao.js";

function displayImage() {
    const fileInput = document.getElementById('file');
    const previewImage = document.getElementById('preview');

    const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
        "image/x-icon"
    ];

    const file = fileInput.files[0];

    if (file) {
        if (allowedMimes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            fileInput.value = '';
            alert('Por favor, selecione uma imagem válida.');
        }
    }
}

document.getElementById("file").addEventListener("change", displayImage);

document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    console.log(file);
    const descricao = document.getElementById('descricao').value;
    const dados = localStorage.getItem("dadosUsuario");
    const dadosUsuario = JSON.parse(dados);
    const email = dadosUsuario.email;

    const result = await req.postar(file, descricao, email);

    console.log(result);

});
