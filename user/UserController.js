const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

const axios = require("axios");


router.get("/admin/users", (req,res) => {
    User.findAll().then(users => {
        res.render("admin/users/index",{
            users:users
        })
    })
});

router.get("/admin/users/create", (req,res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req,res) => {
    
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var email = req.body.email;
    var password = req.body.password;
    var cep = req.body.cep;
    var rua = req.body.rua;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var numero = req.body.numero;
    var complemento = req.body.complemento;

    User.findOne({
        where:{
            email:email
        }
    }).then(user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);

            User.create({
                email:email,
                nome:nome,
                cpf:cpf,
                cep:cep,
                rua:rua,
                bairro:bairro,
                cidade:cidade,
                uf:estado,
                numero:numero,
                pontoReferencia:complemento,
                senha:hash
            }).then(() =>{
                console.log("usuario criado com sucesso");
                res.redirect("/");
            }).catch(err =>{
                console.log(err);
                res.redirect("/");
            })

        }else{
            res.redirect("/");
        };
    })  

});

router.get("/login",(req,res) => {
    res.render("admin/users/login");
})

router.post("/authenticate",(req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email:email}}).then(user => {
        if(user != undefined){

            var correct = bcrypt.compareSync(password, user.senha )

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.render("user/bemvindo",{
                    user: user.email
                })
            }else{
                res.redirect("/");
            }
        }else{
            res.redirect("/");
        }

    }).catch(err =>{
        console.log(err);
    })



})

router.get("/logout",(req,res) => {
    req.session.user = undefined;
    res.redirect("/login");
})


router.get("/validateCep/:cep",(req,res) => {

    var cep = req.params.cep;


    axios.get("https://viacep.com.br/ws/"+ cep.replace("-","") + "/json/")
    .then(result =>{       
          console.log(result.data);
          res.send(result.data);    
    })

    
})



module.exports = router;