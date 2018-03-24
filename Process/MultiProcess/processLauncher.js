//Clase que lanza los subprocesos o childprocess
'use strict'

var spawn = require('child_process').fork;
//Representa una carga pesada de trabajo
var arreglo = [1,2,3,4,5,6,7,8,9,10];
//Dividimos el arreglo en dos para procesarlo x separado
var arr1 = arreglo.slice(0,4);
var arr2 = arreglo.slice(4, arreglo.length);

//Proceso 1
var childprocess1 = spawn('workers.js');
//Proceso 2
var childprocess2 = spawn('workers.js');

var result = 0;
//Levanta proceso 1
childprocess1.send({
    array: arr1
});
//Levanta proceso 2
childprocess2.send({
    array: arr2
});

childprocess1.on('message', (data) => {
    result += data.result;
    console.log(result);
});

childprocess2.on('message', (data) => {
    result += data.result;
    console.log(result);
});
