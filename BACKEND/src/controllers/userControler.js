const bcrypt = require("bcrypt");
const passport = require("passport");
const model = require("../models/userModel");

const registro = async (req, res) => {
  let { name, email, senha } = req.body;
  try {

    name = name.trim();
    email = email.trim();

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    senha = senhaHash;

    model.registrar(name, email, senha);

    return res.status(200).send(`Usuario criado com suscesso`);
  } catch (err) {
    return res.status(500).send("Erro ao registrar usuário.");
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.send(err);
      }
      req.user = user;
      return res.send(req.user);
    });
  })(req, res, next);
};

const seguir = async (req, res) => {
  const result = await model.seguir(req.body.email, req.body.email_);

  return res.send(result);
};

const numeroSeguidor = async (req, res) => {
  const result = await model.numeroSeguidor(req.body.email);
  
  return res.send(`${result}`);
}

const numeroSeguindo = async (req, res) => {
  const result = await model.numeroSeguindo(req.body.email);
  
  return res.send(`${result}`);
}

module.exports = {
  registro,
  login,
  seguir,
  numeroSeguidor,
  numeroSeguindo
};
