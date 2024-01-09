const user = require("express").Router();
const midle = require("../midlewares/user");
const controller = require("../controllers/userControler");
const multer = require("multer");
const multerConfig = require("../config/multer");

user.post("/registrar", midle.registrar, controller.registro);
user.post("/logar", midle.logar, controller.login);

user.post("/seguir", midle.seguir, controller.seguir);

user.get("/numSeguidor", midle.email, controller.numeroSeguidor);
user.get("/numSeguindo", midle.email, controller.numeroSeguindo);

user.post("/sendEmail", controller.enviarEmail);

user.put("/addFoto", multer(multerConfig).single("file"), controller.addFoto);

module.exports = user;