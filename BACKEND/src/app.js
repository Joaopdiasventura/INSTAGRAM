require("dotenv").config();

const express = require("express"); 
const morgan = require("morgan");
const mongoose = require("mongoose");
const rout = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(morgan("dev"));
app.use(rout);

const mongoURL = "mongodb+srv://joaopdiasventura:jpplay2_0@insta.i91vlgw.mongodb.net/insta";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
}).then(()=>{
    console.log("Conectado ao mongodb...");
    app.listen(port, ()=>{
        console.log(`Server is running on ${port}`);
    });
});
