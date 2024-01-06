const connection = require("../models/conecction");
const modulo = require("../models/userModel");

const registrar = async (req, res, next) => {

    if (!req.body.name || req.body.name == undefined || req.body.name == null) {
        return res.send("Campo nome é obrigatório");
    }

    if (!req.body.email || req.body.email == undefined || req.body.email == null) {
        return res.send("Campo email é obrigatório");
    }

    if (!req.body.senha || req.body.senha == undefined || req.body.senha == null) {
        return res.send("Campo senha é obrigatório");
    }

    const email = modulo.procurarEmail(req.body.email)

    if (email) {
        return res.send("Esse email já está cadastrado no sistema... tente outro")
    }

    return next();

}

const logar = (req, res, next) => {

    if (!req.body.name || req.body.name == undefined || req.body.name == null) {
        return res.send("Campo nome é obrigatório");
    }

    if (!req.body.email || req.body.email == undefined || req.body.email == null) {
        return res.send("Campo email é obrigatório");
    }

    return next();

}

const seguir = async (req, res, next) => {
    
    if (!req.body.email || req.body.email == undefined || req.body.email == null) {
        return res.send("Campo email é obrigatório");
    }

    
    if (!req.body.email_ || req.body.email_ == undefined || req.body.email_ == null) {
        return res.send("Campo email é obrigatório");
    }

    try {

        let [result] = await connection.execute("SELECT * FROM segue WHERE fk_usuario_email = ?", [req.body.email]);
        result = result[0];

        if (result) {
            await connection.execute("DELETE FROM segue WHERE fk_usuario_email = ?", [req.body.email]);
            return res.send("Usuario já segue o outro");
        }

        return next();
    } catch (err) {
        console.error(err);
    }

}

const email = (req, res, next) => {

    if (!req.body.email_ || req.body.email_ == undefined || req.body.email_ == null) {
        return res.send("Campo email é obrigatório");
    }

    return next();
}

module.exports = {
    registrar,
    logar,
    seguir,
    email
}