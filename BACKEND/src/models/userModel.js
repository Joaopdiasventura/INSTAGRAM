const createConnection = require("./conecction");

const executarQuery = async (query, params) => {
  let connection;
  try {
    connection = await createConnection();
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (error) {
    console.error("Erro ao executar a query:", error);
    throw error;
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

const registrar = async (name, email, senha) => {
  return await executarQuery(
    "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
    [name, email, senha]
  );
};

const procurarEmail = async (email) => {
  return await executarQuery(
    "SELECT * FROM usuario WHERE email = ?",
    [email]
  );
};

const seguir = async (email, email_) => {
  return await executarQuery(
    "INSERT INTO segue (fk_usuario_email, fk_usuario_email_) VALUES (?, ?)",
    [email, email_]
  );
};

const numeroSeguidor = async (email) => {
  const rows = await executarQuery(
    "SELECT * FROM segue WHERE fk_usuario_email_ = ?",
    [email]
  );
  return rows.length;
};

const numeroSeguindo = async (email) => {
  const rows = await executarQuery(
    "SELECT * FROM segue WHERE fk_usuario_email = ?",
    [email]
  );
  return rows.length;
};

module.exports = {
  registrar,
  procurarEmail,
  seguir,
  numeroSeguidor,
  numeroSeguindo,
};