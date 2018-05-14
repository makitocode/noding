'use strict'

const express = require('express');
//Instancia el objeto router para configurarlo
const api = express.Router();
//aws lib
const jwtbiz = require('./jwtbiz');


/*************************************** jwt logic ******************************/

api.get('/user', jwtbiz.IniciarSesion);

api.post('/user', jwtbiz.CrearUsuario);


//Export route module
module.exports = api