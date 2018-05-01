'use strict'
//aws lib
const aws = require('aws-sdk');
//Referencia a mongoose
const mongoose = require('mongoose');
//Se obtiene la url desde una variable de entorno en el config.js
var config = require('./config')
const queueUrl = config.QueueUrl;
const Log = require('./model/log');
//--
//Carga las credenciales e inicializa el objeto.
aws.config.accessKeyId = config.accessKeyId;
aws.config.secretAccessKey = config.secretAccessKey;
aws.config.region = config.region;
// Instantiate SQS.
const sqs = new aws.SQS();

///Método que realiza la consulta del mensaje disponible en cola
function ConsultaryGuardaMensaje(){
    return new Promise((resolve, reject)=>{
        try {
            //Obtiene la variable del config
            let visibilityTimeOut = parseInt(config.QueueTiempoProcesamiento);
            let params = {
                AttributeNames: [
                "SentTimestamp"
                ],
                MaxNumberOfMessages: 1,
                MessageAttributeNames: [
                "All"
                ],
                QueueUrl: queueUrl,
                VisibilityTimeout: 20,
                WaitTimeSeconds: 0
            };
            //Consulta mensaje pendiente en la cola
            sqs.receiveMessage(params, function(err, data) {
                if(err) {
                    return reject(`Error recibiendo mensaje de la cola: ${err}`);
                } else{
                    if(data.Messages)
                    {
                        let body = data.Messages[0].Body;
                        console.log(`Mensaje de la cola: ${body}`);
                        let ReceiptHandle = data.Messages[0].ReceiptHandle; 
                        console.log(`receipt-id: ${ReceiptHandle}`);
                        //Setea el objeto a guardar en mongo
                        let log = new Log();
                        log.id = ReceiptHandle;
                        log.error = body;
                        log.save((err, logSaved)=>{
                            if(err){
                                console.log(`Error guardando msj: ${err}`);
                                return reject(`Error almacenando el log. ${err}`);
                            }
                            console.log('Proceso de consulta y guardado exitoso');
                            resolve(ReceiptHandle);
                        })//Close save message
                    }
                    else{
                        console.log('No existen mensajes en la cola para procesar');
                        resolve(0);
                    }
                    
                }//Close else
            });//Close receiveMessage
        } catch (error) {
            console.log(`Error: ${error}`);
            return reject(error);
        } 
    })//Close promise
}

///Método que realiza la eliminación del mensaje de la cola por id
function EliminarMensaje(ReceiptHandle){
    return new Promise((resolve, reject)=>{
        //Se obtiene de los parámetros el id del video
        let _idMensaje = ReceiptHandle;
        console.log(`id mensaje: ${_idMensaje}`);
        var paramsToDelete = {
            QueueUrl: queueUrl,
            ReceiptHandle: _idMensaje
        };
        //Elimina mensaje de la cola
        sqs.deleteMessage(paramsToDelete, function(err, data) {
            if(err) {
                console.log(`Error eliminando mensaje de la cola: ${err}`)
                reject(`Erro eliminando mensaje de la cola: ${err}`);
            } 
            else {
                console.log(`Eliminación correcta del mensaje: ${_idMensaje}`)
                resolve(`Eliminación exitosa del mensaje :)`);
            } 
        });//Close deleteMessage
    });//Close promise
}

//Worker logic
function runWorker(){
    console.log('Se inicia proceso de consulta de logs');
    ConsultaryGuardaMensaje().then((id)=>{
        if(id == 0)
            console.log('No existen registros para procesar');
        else{
            console.log(`Sistema preparado para eliminar mensaje`);
            EliminarMensaje(id);
        }
    }).catch(err => console.log(`error consultar o guardar mensaje. ${err}`))
}

//****MONGOdb****
mongoose.connect(config.db, (err, res)=>{
    if(err) {
        console.log(`Error al conectar a la base de datos: ${err}`);
    }
    else{
        console.log('Conexión a Mongodb establecida...');
        setInterval(runWorker, 5000);//-> miliseconds
    }
})
