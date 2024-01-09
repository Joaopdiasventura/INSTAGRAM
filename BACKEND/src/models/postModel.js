const connection = require("./conecction");

const executeQuery = async (query, params) => {
  let connectionInstance;
  try {
    connectionInstance = await connection();
    const [rows] = await connectionInstance.execute(query, params);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (connectionInstance) {
      connectionInstance.end();
    }
  }
};

const getAll = async () => {
  const result = await executeQuery("SELECT * FROM usuario");
  return result;
};

const createPost = async (description, image_url, creation_date, user_email) => {
  const params = [description, image_url, creation_date, user_email];
  const result = await executeQuery(
    "INSERT INTO postagem (descricao, url_imagem, dt_criacao, fk_usuario_email) VALUES (?, ?, ?, ?)",
    params
  );

  return result;
};

const findUser = async (email) => {

  const postsQueryResult = await executeQuery(
    "SELECT * FROM postagem WHERE fk_usuario_email = ?",
    [email]
  );

  const result = [postsQueryResult];

  return result;
};

const findAllPosts = async (email) => {
  const userQueryResult = await executeQuery(
    "SELECT fk_usuario_email_ FROM segue WHERE fk_usuario_email = ?",
    [email]
  );

  const posts = [];

  for (let i = 0; i < userQueryResult[0].length; i++) {
    const postQueryResult = await executeQuery(
      "SELECT * FROM postagem WHERE fk_usuario_email = ?",
      [userQueryResult[0][i].fk_usuario_email_]
    );

    for (let j = 0; j < postQueryResult[0].length; j++) {
      posts.push(postQueryResult[0][j]);
    }
  }

  return posts;
};

const user = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM usuario",
    [email]
  );
  return result;
}; 

module.exports = {
  getAll,
  createPost,
  findUser,
  findAllPosts,
  user
};
