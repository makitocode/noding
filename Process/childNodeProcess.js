'use strict'
//Proceso hijo, listener de mensajes del proceso padre
process.on('message', (message)=> { 
    //El mensaje llega en formato json https://nodejs.org/api/process.html 
    var msj = JSON.parse(message);
    console.log(msj); //el mensaje no se va a ver desde el lanzador o proceso padre
    process.send({msg: "Proceso Hijo Finalizado"}); // se envá un mensaje al proceso padre
});