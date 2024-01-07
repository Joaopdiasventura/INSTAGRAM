const model = require("../models/postModel");

const existFile = (req, res, next) => {
  
  if (!req.file || req.file == undefined || req.file == null) {
    return res.send("Envie uma imagem");
  }

  return next();
};

const existUser = async (req, res, next) => {
  const result = await model.findUser(req.params.email);

  if (!result || result == undefined || result == null) {
    return res.send("Usuário não encontrado");
  }

  return next();
};

module.exports = {
  existUser,
  existFile,
};
