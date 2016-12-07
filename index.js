'use strict'

const mongoose = require('mongoose')
const app = require('./app')            // la configuracion de expres
const config = require('./config')

mongoose.connect(config.db, function(err, res) {
    if(err) throw err;
    else{
        console.log('Connected to Database Amazon');
        app.listen(config.port, ()=>{
            console.log(`Node server iniciado en http://localhost:${config.port}`)
        });
    }
});

app.get('/', (req, res) => {
    res.send('Bienvenido! La api esta corriendo en http://localhost:'+config.port+'/api')
})