const rout = require("express").Router();
const multer = require("multer"); 
const multerConfig = require("./config/multer")

const Post = require("./models/Post")

rout.post("/post", multer(multerConfig).single("file"), async (req, res) => {
    const post = await Post.create({
        name: req.file.originalname,
        src: req.file.path,
        key: req.file.filename
    })

    await post.save();

    return res.send(req.file);
});

module.exports = rout;