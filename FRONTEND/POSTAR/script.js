function displayImage() {
    const fileInput = document.getElementById('file');
    const previewImage = document.getElementById('preview');

    const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
    ];

    const file = fileInput.files[0];
    console.log(file);

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
