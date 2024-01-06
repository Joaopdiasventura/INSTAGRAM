const connection = require("./conecction");

const getAll = async () => {
    const all = await connection.execute("SELECT * FROM usuario");
    return all[0]
}

const criar = async (descricao, url_imagem, dt_criação, usuario_email) => {
    const array = [descricao, url_imagem, dt_criação, usuario_email];
    const result = await connection.execute("INSERT INTO postagem (descricao, url_imagem, dt_criacao, fk_usuario_email) VALUES (?, ?, ?, ?)", array);

    return result
}

module.exports = {
    getAll,
    criar
}; 