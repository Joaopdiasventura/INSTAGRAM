const connection = require("../models/conecction");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const passport = require("passport");

module.exports = async function logar() {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "senha" },
      async (email, senha, done) => {
        let user = await connection.execute(
          "SELECT * FROM usuario WHERE email = ?",
          [email]
        );
        user = user[0][0];

        if (!user) {
          return done(null, false, { message: "Essa conta não existe" });
        }

        bcrypt.compare(senha, user.senha, (erro, batem) => {
          if (erro) {
            return done(erro);
          }

          if (batem) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Senha incorreta" });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });
};
