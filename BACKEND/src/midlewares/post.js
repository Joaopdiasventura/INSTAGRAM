const model = require("../models/postModel");

const existFile = (req, res, next) => {

  const allowedMimes = [
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/gif",
  ];

  if (!req.body.email || req.body.email == undefined || req.body.email == null) {
    return res.send({message: "Campo email é obrigatório"});
  }

  if (!req.body.descricao || req.body.descricao == undefined || req.body.descricao == null) {
    return res.send({message: "Campo descrição é obrigatório"});
  }
  
  if (!req.file || req.file == undefined || req.file == null) {
    return res.send({message: "Envie uma imagem/gif"});
  }

  if (allowedMimes.includes(req.file.mimetype)) {
    return next();
  }
  else{
    return res.send({message: "Envie uma imagem/gif"});
  }

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
