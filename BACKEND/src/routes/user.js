const user = require("express").Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const midle = require("../midlewares/user")
const controller = require("../controllers/userControler");

user.post("/registrar", midle.registrar, controller.registro);
user.post("/logar", midle.logar, controller.login)

user.post("/seguir", midle.seguir, controller.seguir)
user.post("/numSeguidor", midle.email, controller.numeroSeguidor)

module.exports = user;