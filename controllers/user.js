'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')
var dateFormat = require('dateformat');


// GET
function getUsers(req,res){
    User.find({}, (err, users) => {
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
        if(!users) return res.status(404).send({mensaje:"No existe la coleccion"})

        res.status(200).jsonp(users)
    })
}

//Get/:id
function getUserByName(req,res){
    console.log('/Get/:name')
    console.log(req.params.name)

    let  userName = req.params.name

    User.findOne({name:userName}, (err, user) => {
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
        if(!user) return res.status(404).send({mensaje:"El usuario no existe"})
        else{
            res.status(200).jsonp(user)
        }
    })
}

//POST
function saveUser(req,res) {
    console.log('POST /api/users')
    console.log(req.body)

    let user = new User()
    user.email = req.body.email
    user.name = req.body.name
    user.password = req.body.password

    user.save((err,userRegister)=>{
        if(err) res.status(500).jsonp({mensaje:"Error al guardar en la BD",err})
        else {
            var token = jwt.sign(userRegister, "MetallicaEsLaLuz", {
                expiresIn: '1h'
            })

            res.status(200).jsonp({
                name: userRegister.name,
                email: userRegister.email,
                token: token
            })
        }
    })
}

//PUT
function updateUser(req,res){
    console.log('/PUT api/users')
    console.log(req.body)

    let userId = req.params.userId
    let update = req.body

    User.findByIdAndUpdate(userId,update,(err,userUpdated) => {
        if(err) res.status(500).send({mensaje:`Error al actualizar el producto ${err}`})

        res.status(200).jsonp({user:userUpdated})
    })
}

function authUser(req, res){
    console.log("POST /api/auth")
    console.log(req.body)

    let username = req.body.name
    User.findOne({name:username}, (err, user) =>{
        if(err) throw err;

        if(!user) res.status(404).jsonp({success: false, mensaje:" Error al autenticar: Credenciales incorrectas USUARIO"})
        else{
            if(user.password != req.body.password) return res.status(404).send({success: false, mensaje:"Error al autenticar:  Credenciales incorrectas PASS"})
            else{
                var token = jwt.sign(user, "MetallicaEsLaLuz",{
                    expiresIn: '1h'
                })
                user.token = token;
            }
            res.status(200).jsonp({
                userId: user._id,
                name: user.name,
                email: user.email,
                token: token
            })
        }
    })
}

module.exports = {
    getUsers,
    getUserByName,
    saveUser,
    updateUser,
    authUser
}