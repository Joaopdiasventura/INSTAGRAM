const connection = require("../models/conecction");
const modulo = require("../models/userModel");

const registrar = async (req, res, next) => {
  if (!req.body.name || req.body.name == undefined || req.body.name == null) {
    return res.send({message: "Campo nome é obrigatório"});
  }

  if (
    !req.body.email ||
    req.body.email == undefined ||
    req.body.email == null
  ) {
    return res.send({message: "Campo email é obrigatório"});
  }

  if (
    !req.body.senha ||
    req.body.senha == undefined ||
    req.body.senha == null
  ) {
    return res.send("Campo senha é obrigatório");
  }

  const email = await modulo.procurarEmail(req.body.email);

  if (email[0] || email[0] != undefined || email[0] != null) {
    return res.send({message: "Esse email já está cadastrado no sistema... tente outro"});
  }

  return next();
};

const logar = (req, res, next) => {
  if (
    !req.body.senha ||
    req.body.senha == undefined ||
    req.body.senha == null
  ) {
    return res.send({message: "Campo senha é obrigatório"});
  }

  if (
    !req.body.email ||
    req.body.email == undefined ||
    req.body.email == null
  ) {
    return res.send({message: "Campo email é obrigatório"});
  }

  return next();
};

const seguir = async (req, res, next) => {
  if (
    !req.body.email ||
    req.body.email == undefined ||
    req.body.email == null
  ) {
    return res.send({message: "Campo email é obrigatório"});
  }

  if (
    !req.body.email_ ||
    req.body.email_ == undefined ||
    req.body.email_ == null
  ) {
    return res.send({message: "Campo email é obrigatório"});
  }

  try {
    let [result] = await connection.execute(
      "SELECT * FROM segue WHERE fk_usuario_email = ? and fk_usuario_email_ = ?",
      [req.body.email, req.body.email_]
    );
    result = result[0];

    if (result) {
      await connection.execute("DELETE FROM segue WHERE fk_usuario_email = ? and fk_usuario_email_ = ?", [
        req.body.email, req.body.email_
      ]);
      return res.send({message: "Usuario já segue o outro"});
    }

    return next();
  } catch (err) {
    console.error(err);
  }
};

const email = (req, res, next) => {
  if (
    !req.body.email_ ||
    req.body.email_ == undefined ||
    req.body.email_ == null
  ) {
    return res.send({message: "Campo email é obrigatório"});
  }

  return next();
};

module.exports = {
  registrar,
  logar,
  seguir,
  email,
};
