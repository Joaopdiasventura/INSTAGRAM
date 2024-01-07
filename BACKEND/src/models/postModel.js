const connection = require("./conecction");

const getAll = async () => {
  const all = await connection.execute("SELECT * FROM usuario");
  return all[0];
};

const criar = async (descricao, url_imagem, dt_criação, usuario_email) => {
  const array = [descricao, url_imagem, dt_criação, usuario_email];
  const result = await connection.execute(
    "INSERT INTO postagem (descricao, url_imagem, dt_criacao, fk_usuario_email) VALUES (?, ?, ?, ?)",
    array
  );

  return result;
};

const findUser = async (email) => {
  console.log(email);
  const user = await connection.execute(
    "SELECT * FROM usuario WHERE email = ?",
    [email]
  );
  const posts = await connection.execute(
    "SELECT * FROM postagem WHERE fk_usuario_email = ?",
    [email]
  );

  const result = [user[0][0], posts[0]];

  return result;
};

const findAllPosts = async (email) => {

  const user = await connection.execute(
    "SELECT fk_usuario_email_ FROM segue WHERE fk_usuario_email = ?",
    [email]
  );

  const posts = [];
  console.log(user[0]);

  for (let i = 0; i < user[0].length; i++) {

    const post = await connection.execute(
      "SELECT * FROM postagem WHERE fk_usuario_email = ?",
      [user[0][i].fk_usuario_email_]
    );

    for (let j = 0; j < post[0].length; j++) {
      posts.push(post[0][j]);
    }
  }

  return posts;
};

module.exports = {
  getAll,
  criar,
  findUser,
  findAllPosts,
};
