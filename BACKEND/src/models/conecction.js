const mysql = require("mysql2/promise");

async function createConnection() {
  const url =
    process.env.MYSQL_HOST;
  try {
    const connection = await mysql.createConnection(url);
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    return connection;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
}

module.exports = createConnection;
