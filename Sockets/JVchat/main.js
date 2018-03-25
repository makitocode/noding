'use strict'

const net = require('net');
var devices = [];

var device = function(){
    this.deviceName = '';
    this.connected = true;
    this.socket = null; 
};

var server = net.createServer((socket)=>{
    socket.write('Conectado al servidor. Ahora escribe el nombre del dispositivo');
    var disp = new device();
    disp.socket = socket;

    socket.on('data', (d)=> {
        //Ingresa cuando es por primera vez
        if(disp.deviceName == null){
            disp.deviceName = d; 
            //Aquí se guardaría el dispositivo en la bd
            devices.push(disp);
        }
        else{
            devices.forEach((device)=>{
                device.socket.write(`${disp.deviceName} : ${d}`);
            });
        }
    });

    //ERROR------- 
    socket.on('close', ()=> {
        console.log(`${disp.deviceName} se ha desconectado.`);
        devices.filter((device)=> device.deviceName != disp.deviceName);
        //Se envìa mensaje a cada uno de los dispositivos
        // devices.forEach((device)=> device.socket.write(`${disp.deviceName} se ha desconectado.`));
    })
});

server.listen('2018', ()=> {
    console.log('Servidor corriendo en el puerto 2018...');
});