'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSChema = new Schema({
    email: {type: String, unique:true, lowercase:true},
    name: String,
    avatar: {type: String, default:"avatar"},
    password: {type: String },
    lastName:String,
    company:String,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: {type: Date, default: Date.now()}
})

// una funcion para antes de que se registre el usuario poder encriptar el password
// UserSChema.pre('save', (next) => {
//     let user = this
//     //if(!user.isModified('password')) return next()

//     bcrypt.genSalt(10, (err,salt) => {
//         if(err) return next(err)

//         bcrypt.hash(user.password, salt, null, (err,hash) => {
//             if(err) return next(err)

//             user.password = hash
//             next()
//         })
//     })
// })

module.exports = mongoose.model('User', UserSChema)
