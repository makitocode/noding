'use strict'
//Clase que lanza un proceso de nodejs

//child_process.fork(): spawns a new Node.js process and invokes a specified module
//with an IPC communication channel established that allows sending messages between 
//parent and child. https://nodejs.org/api/child_process.html
var spawn = require('child_process').fork;
var child = spawn('childNodeProcess.js');

//Se envía mensaje al proceso hijo
child.send(JSON.stringify({msj: "Mensaje del padre"}));

//Si el proceso padre llegase a recibir un mensaje del proceso hijo
//con esta instrucción se habilita un listener para obtener info del hijo
child.on('message', (msj) => {
    console.log('Mensaje del proceso hijo recibido en el proceso padre');
    console.log(msj);
});