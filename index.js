const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const conn = require("./database/database");

const userController = require("./user/UserController")

const User = require("./user/User");

//view engine
app.set('view engine','ejs');

//Session
app.use(session({
        secret: "bemol",
        cookie:{
            maxAge: 30000
        }
  
}))

//body parser
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());

//static
app.use(express.static('public'));

//database
conn
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco bem sucedida");
    })
    .catch((error) => {
        console.log(error);
    });


    app.use("/",userController);


    app.get("/",(req,res) => {

        res.render("login/index");
    
    });

    app.get("/create",(req,res) => {

        res.render("user/create");
    
    });


    app.listen(8000,() => {
        console.log("Servidor Rodando");
    })