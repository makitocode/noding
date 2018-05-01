'use strict'

const express = require('express');
//Instancia el objeto router para configurarlo
const api = express.Router();
//aws lib
const sqs = require('./sqs');


/*************************************** Queue ******************************/
//Obtiene mensaje de la cola
api.get('/msj', sqs.SQSConsultarMensaje);
//Envia mensaje a la cola
api.post('/msj', sqs.SQSCrearMensaje);
//Elimina mensaje de la cola
api.delete('/msj', sqs.SQSEliminarMensaje)

//Export route module
module.exports = api