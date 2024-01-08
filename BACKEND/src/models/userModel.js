const createConnection  = require("./conecction");

let connection;

const conectar = async () => {
  connection = await createConnection();
};

conectar();

const registrar = async (name, email, senha) => {
  const result = await connection.execute(
    "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
    [name, email, senha]
  );
  return result;
};

const procurarEmail = async (email) => {
  const result = await connection.execute(
    "SELECT nome FROM usuario WHERE email = ?",
    [email]
  );
  return result;
};

const seguir = async (email, email_) => {
  const result = await connection.execute(
    "INSERT INTO segue (fk_usuario_email, fk_usuario_email_) VALUES (?, ?)",
    [email, email_]
  );

  return result;
};

const numeroSeguidor = async (email) => {
  let result = await connection.execute(
    "SELECT * FROM segue WHERE fk_usuario_email_ = ?",
    [email]
  );
  result = result[0];
  return result.length;
};

const numeroSeguindo = async (email) => {
  let result = await connection.execute(
    "SELECT * FROM segue WHERE fk_usuario_email = ?",
    [email]
  );
  result = result[0];
  return result.length;
};

module.exports = {
  registrar,
  procurarEmail,
  seguir,
  numeroSeguidor,
  numeroSeguindo,
};
