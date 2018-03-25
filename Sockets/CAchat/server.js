//
'use strict'
//Aplicación express
var express = require('express');
var app = express();
//Se crea el servidor con express a través de http
var server = require('http').Server(app);
//al objeto 'socket.io' le pasamos el servidor creado con express
var io = require('socket.io')(server);

//Cuando el app reciba un get en la ruta raíz realice la sgte función
app.get('/', function(req, resp){
    resp.status(200).send('Cachat runnig... port 2018 :) ');
});

server.listen(2018, ()=> {
    console.log('WebSocket.io server running on 2018...');
});