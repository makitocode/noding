'use strict'

//Listener de mensajes
process.on('message', (d)=> { 
    // ---> array [1...x] suma todos los elementos del arreglo
    var result = d.array.reduce((a,x)=> a+x); 
    process.send({result: result});
    //process.exit([code])
    //Ends the process with the specified code. 
    //If omitted, exit uses the 'success' code 0.
    //To exit with a 'failure' code:
    //process.exit(1);
    //The shell that executed node should see the exit code as 1.
    process.exit(0);
});