const adiconarBio = async () => {

};

const adiconarFoto = async (file, email) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);

        const response = await fetch('http://localhost:3000/addFoto', {
            method: 'PUT',
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
};

const receberPosts = async (email) => {
    try {
        const response = await fetch(`http://localhost:3000/receberUser/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return ("Erro ao enviar o email. Status:", response);
        }
    } catch (err) {
        return('Erro:', err);
    }
};

const req = {
    adiconarBio,
    adiconarFoto,
    receberPosts
}

export default req;