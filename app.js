'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')         // las rutas a los controladores


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(function(req, res, next){
    //el dominio del cliente al que le vamos a dar permiso
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // los metodos que le vamos a permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // las cabeceras que le permitimos
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', api)

module.exports = app