'use strict'

const Game = require('../models/game')

// GET
function getGames(req,res){
    console.log('GET /api/games')

    if(req.query.userAuthor){
        let user = req.query.userAuthor
        Game.find({userAuthor:user}, (err, games) => {
            if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
            if(!games) return res.status(404).send({mensaje:"No existe la coleccion"})

            res.status(200).jsonp(games)
        })
    }else{
        Game.find({}, (err, games) => {
            if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
            if(!games) return res.status(404).send({mensaje:"No existe la coleccion"})

            res.status(200).jsonp(games)
        })
    }

}

//Get/:id
function getGameById(req,res){
    
    console.log(req.params.idGame)
    console.log('/Get/:idGame')

    let id = req.params.idGame
    Game.findById(id, (err, game) => {
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion por id ${err}`})
        if(!game) return res.status(404).send({mensaje:"El juego no existe"})
        else{
            res.status(200).jsonp(game)
        }
    })
}

//POST
function saveGame(req,res) {
    console.log('POST /api/games')
    console.log(req.body)

    let game = new Game()
    game.title = req.body.title
    game.genre = req.body.genre
    game.platforms = req.body.platforms
    game.languages = req.body.languages
    game.players = req.body.players
    game.description = req.body.description
    game.gameMode = req.body.gameMode
    game.userAuthor = req.body.userAuthor

    game.save((err,gamer)=>{
        if(err) res.status(500).jsonp({mensaje:"Error al guardar en la BD",err})
        else {
            res.status(200).jsonp(gamer)
        }
    })
}


module.exports = {
    getGames,
    getGameById,
    saveGame
}