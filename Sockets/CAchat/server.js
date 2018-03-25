//
'use strict'
//Aplicación express
var express = require('express');
var app = express();
//Se crea el servidor con express a través de http
var server = require('http').Server(app);
//al objeto 'socket.io' le pasamos el servidor creado con express
var io = require('socket.io')(server);


var messages = [{
    id: 1,
    texto: 'hey hey hey!',
    autor: 'Miguel González'
}];

app.use(express.static('Public'));
//Cuando el app reciba un get en la ruta raíz realice la sgte función
app.get('/', function(req, resp){
    resp.status(200).send('Cachat runnig -> port 2018 :) ');
});

//Escucha un mensaje que llegue de cualquier cliente cuando se conecta
io.on('connection', (socket)=> {
    console.log('Someone has connected');
    //Emite el mensaje con la data
    socket.emit('messages', messages)

    socket.on('new-message', (data)=>{
        //Aquí se trabaja la data, se almacena en alguna bd etc...
        messages.push(data);
        io.sockets.emit('messages', messages);
    })

    
});

//********************************************************** */
server.listen(2018, ()=> {
    console.log('WebSocket.io server running on 2018...');
});