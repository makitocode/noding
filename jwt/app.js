'use strict'
//Permite el tratamiento de respuesta y mapeo de los body en las peticiones HTTP
const express = require('express')
const bodyParser = require('body-parser')

//Se instancia el servicio
const app = express()
//Instancia el archivo de rutas
const api = require('./routes')
var constants = require("./config");

//Configuraciones del bodyparser - Parsear objetos del body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) //Para adminitr peticiones con json (body)
//Para usar el modulo api
app.use('/api', api)

//Exportar Modulos
module.exports = app
