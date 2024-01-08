const postar = async (file, descricao, email) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('descricao', descricao);
        formData.append('email', email);

        const response = await fetch('https://insta-8m9t.onrender.com/post', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Erro ao enviar o postagem. Status:", response.status);
            return null;
        }
    } catch (err) {
        console.error('Erro:', err);
        return null;
    }
}

const req = {
    postar
};

export default req;
