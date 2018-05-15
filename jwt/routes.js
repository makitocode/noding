'use strict'

const express = require('express');
//Instancia el objeto router para configurarlo
const api = express.Router();
//aws lib
const user = require('./controller/userController');
//middleware
const auth = require('./middleware/auth')

/*************************************** jwt logic ******************************/

api.get('/user/signin', user.SignIn);
api.post('/user/signup', user.SignUp);

api.get('/private', auth, (req, res)=>{
    res.status(200).send({message: 'Tienes acceso'});
});


//Export route module
module.exports = api