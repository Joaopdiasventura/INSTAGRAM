const bcrypt = require("bcrypt");
const passport = require("passport");
const nodemailer = require("nodemailer");
const model = require("../models/userModel");

require("dotenv").config();

const registro = async (req, res) => {
  let { name, email, senha } = req.body;
  try {
    name = name.trim();
    email = email.trim();

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    senha = senhaHash;

    model.registrar(name, email, senha);

    return res.status(200).send({
      name,
      email,
      senha
    });
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
      return res.json(user);

    });
  })(req, res, next);
};

const seguir = async (req, res) => {
  try {
    const result = await model.seguir(req.body.email, req.body.email_);

    return res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const numeroSeguidor = async (req, res) => {
  try {
    const result = await model.numeroSeguidor(req.body.email);

    return res.send(`${result}`);
  } catch (error) {
    console.log(error);
  }
};

const numeroSeguindo = async (req, res) => {
  try {
    const result = await model.numeroSeguindo(req.body.email);

    return res.send(`${result}`);
  } catch (error) {
    console.log(error);
  }
};

const enviarEmail = async (req, res) => {
  try {
    const cod = (Math.random() * 999).toFixed(0);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "CÓDIGO DE REGISTRO PARA O ZAP DO VULGO JP",
      text: cod
    };

    await transporter.sendMail(mailOptions);
    console.log(cod);
    return res.send({ code: cod });

  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    res.status(500).send("Erro ao enviar o e-mail.");
  }
};

const addFoto = async (req, res) => {
  const url_imagem = req.file.location;
  const email = req.body.email;

  const result = await model.addFoto(url_imagem, email);

  return res.send(result);
};

module.exports = {
  registro,
  login,
  seguir,
  numeroSeguidor,
  numeroSeguindo,
  enviarEmail,
  addFoto
};
