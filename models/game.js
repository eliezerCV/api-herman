'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = Schema({
    title:String,
    genre:String,
    platforms:String,
    languages: String,
    players: String,
    description:String,
    gameMode: String,
    registerDate: {type: Date, default: Date.now()},
    lastUpdate: {type: Date},
    userAuthor: String
})

module.exports = mongoose.model('Game', GameSchema)