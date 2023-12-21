const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;