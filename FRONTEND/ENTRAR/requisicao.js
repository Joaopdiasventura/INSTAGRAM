const sendEmail = async (email) => {
    try {
        const response = await fetch(`https://insta-8m9t.onrender.com/sendEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email})
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
}

const registrar = async (cod, code, name, email, senha) => {

    try {

        if (cod != code) {
            alert("CÓDIGO DE VERIFICAÇÃO INCORRETO");
            return "CÓDIGO DE VERIFICAÇÃO INCORRETO";
        }
        
        const response = await fetch(`https://insta-8m9t.onrender.com/registrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, senha})
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return ("Erro ao enviar o email. Status:", response);
        } 

    } catch (error) {
        return("erro:", error);
    }

}

const logar = async (email, senha) => {

    try {
        
        const response = await fetch(`https://insta-8m9t.onrender.com/logar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, senha})
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return ("Erro ao enviar o email. Status:", response);
        } 

    } catch (error) {
        return("erro:", error);
    }

}  

const req = {
    sendEmail,
    registrar,
    logar
};

export default req;