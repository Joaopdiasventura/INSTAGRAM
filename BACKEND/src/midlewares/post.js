const verifica = (req, res, next) => {
    console.log(req.user);
    const user = req.user;
    if (!user || user == undefined || user == null) {
        return res.send("Usuário precisa estar logado para realizar essa ação")
    }
    return next();
}

module.exports = {
    verifica
}