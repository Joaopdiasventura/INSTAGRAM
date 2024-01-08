const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const posts = require("./routes/posts");
const user = require("./routes/user");
const logar = require("./config/passport");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(
  session({
    secret: "Jpplay2_0",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

logar(passport);

app.use(posts);
app.use(user);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
