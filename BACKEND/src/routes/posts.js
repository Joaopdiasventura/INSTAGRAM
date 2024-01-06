const posts = require("express").Router();
const multer = require("multer");
const path = require("path");
const multerConfig = require("../config/multer");
const controller = require("../controllers/postController")
const midle = require("../midlewares/post")

posts.post("/teste", (req, res) => {
    return res.send(req.body.name)
})

posts.post("/post", multer(multerConfig).single("file"), controller.send);

posts.post("/", controller.getAll);

module.exports = posts; 