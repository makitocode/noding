'use strict'
//Clase para lanzar un proceso de otro programa (Cat)

//Spawn permite lanzar un proceso desde cualquier programa
var spawn = require('child_process').spawn;
//Se lanza un proceso nuevo para leer el archivo process.js
var cat = spawn('cat', ['-n', 'process.js']); //El proceso lanza el programa cat (linux) para leer un archivo
//la salida estandar de spawn es stdout para ver el resultado del proceso lanzado
//stdout: canal donde se lanza la información resultante o de salida 
cat.stdout.on('data', (data)=> //cuando llegue data al canal de salida se imprime en pantalla
{
    console.log(new String(data)); //se parsea a String porque data en array de bytes
});