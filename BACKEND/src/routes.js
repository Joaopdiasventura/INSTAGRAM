const rout = require("express").Router();
const multer = require("multer");
const path = require("path");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");
const User = require("./models/User")

rout.post("/post", multer(multerConfig).single("file"), async (req, res) => {
  const post = await Post.create({
    name: req.file.originalname,
    src: req.file.location,
    key: req.file.key,
    type: req.file.mimetype,
  });

  await post.save();

  return res.send(post);
});

const axios = require("axios");

rout.get("/ver/:key", async (req, res) => {
  try {
    const foto = await Post.findOne({ key: req.params.key });

    if (!foto) {
      return res.status(404).send("Foto não encontrada");
    }

    const response = await axios({
      method: "GET",
      url: foto.src,
      responseType: "stream",
    });

    res.setHeader("Content-Type", `${foto.type}`);
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro ao buscar a foto");
  }
});

rout.post("/registrar", async (req, res) => {
  try {
    console.log(User);
  } catch (error) {
    console.log(error);
  }
});

module.exports = rout;