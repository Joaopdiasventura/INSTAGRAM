const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    seguidores: {
        type: Array,
        default: []
    },
    seguindo: {
        type: Array,
        default: []
    }
});

const User = mongoose.model("User", userSchema);

exports.default = User;