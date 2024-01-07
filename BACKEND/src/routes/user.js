const user = require("express").Router();
const midle = require("../midlewares/user");
const controller = require("../controllers/userControler");

user.post("/registrar", controller.registro);
user.post("/logar", controller.login);

user.post("/seguir", midle.seguir, controller.seguir);

user.get("/numSeguidor", midle.email, controller.numeroSeguidor);
user.get("/numSeguindo", midle.email, controller.numeroSeguindo);

user.post("/sendEmail", controller.enviarEmail);

module.exports = user;