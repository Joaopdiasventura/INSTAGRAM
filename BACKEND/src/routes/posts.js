const posts = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const controller = require("../controllers/postController");
const midle = require("../midlewares/post");

posts.post("/post", multer(multerConfig).single("file"), midle.existFile, controller.send);
posts.get("/findAllPosts", controller.findAllPosts);

posts.get("/receberUser/:email", controller.findUser);

posts.post("/", controller.getAll);

module.exports = posts;