'use strict'

const express = require('express');
//Instancia el objeto router para configurarlo
const api = express.Router();
//aws lib
const jwtbiz = require('./jwtbiz');


/*************************************** jwt logic ******************************/

api.get('/jwt', jwtbiz.IniciarSesion);

//api.post('/msj', jwtbiz.methodpost);


//Export route module
module.exports = api