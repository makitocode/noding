'use strict'

const express = require('express')

//Instancia el objeto router para configurarlo
const api = express.Router();

/*************************************** Queue ******************************/
//Obtiene mensaje de la cola
app.get('/msj', sqs.SQSConsultarMensaje);
//Envia mensaje a la cola
app.post('/msj', sqs.SQSCrearMensaje);
//Elimina mensaje de la cola
app.delete('/msj', sqs.SQSEliminarMensaje)