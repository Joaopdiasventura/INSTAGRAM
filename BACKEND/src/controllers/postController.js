const moment = require("moment");
const model = require("../models/postModel");

const send = async (req, res) => {
  const agora = new Date();

  const descricao = req.body.descricao;
  const url_imagem = req.file.location;
  const dt_criacao = moment(agora).format("YYYY-MM-DD HH:mm:ss");
  const usuario_email = req.body.email;

  let result = await model.criar(
    descricao,
    url_imagem,
    dt_criacao,
    usuario_email
  );

  return res.send(result);
};

const getAll = async (req, res) => {
  const result = await model.getAll();
  return res.send(result);
};

const findUser = async (req, res) => {
  const result = await model.findUser(req.params.email);

  return res.send(result);
};

const findAllPosts = async (req, res) => {
  const email = req.body.email;

  const result = await model.findAllPosts(email);

  return res.send(result);
};

module.exports = {
  getAll,
  send,
  findUser,
  findAllPosts
};
