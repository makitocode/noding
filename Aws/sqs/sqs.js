'use strict'
//aws lib
const aws = require('aws-sdk');
//Se obtiene la url desde una variable de entorno en el config.js
var config = require('./config')
const queueUrl = config.QueueUrl;

//Método que realiza el envío de mensaje a la cola
function SQSCrearMensaje(objrequest, objresponse){
    //Carga las credenciales e inicializa el objeto.
    // aws.config.accessKeyId = process.env.accessKeyId;
    // aws.config.secretAccessKey = process.env.secretAccessKey;
    // aws.config.region = process.env.region;
    //aws.config.loadFromPath(__dirname + '/config.json');
    
    // Instantiate SQS.
    const sqs = new aws.SQS();
    //Se obtiene de los parámetros el id del video
    var _idVideo = objrequest.params.idvideo
    var params = {
        DelaySeconds: 0,
        MessageAttributes: {
         "IdVideo": {
           DataType: "String",
           StringValue: _idVideo.toString()
          }
        },
        MessageBody: `Video ${_idVideo} enviado a la cola`,
        QueueUrl: queueUrl
       };
    //Envia Mensaje a Cola
    sqs.sendMessage(params, function(err, data) {
        if(err) {
            objresponse.end('Error enviando mensaje a la cola.');
            console.log(`Error enviando mensaje a la cola: ${err}`)
        } 
        else {
            objresponse.end('success');
            //Print message id
            console.log(`idmensaje: ${data.MessageId}`)
            //Print message body
            console.log(`body: ${data.MD5OfMessageBody}`)
            //Print message attibute
            console.log(`attibute: ${data.MD5OfMessageAttributes}`)
        } 
    });
    
}

///Método que realiza la consulta del mensaje disponible en cola
function SQSConsultarMensaje(objrequest, objresponse){
    //Carga las credenciales e inicializa el objeto.
    aws.config.accessKeyId = config.accessKeyId;
    aws.config.secretAccessKey = config.secretAccessKey;
    aws.config.region = config.region;
    //aws.config.loadFromPath(__dirname + '/config.json');
    
    // Instantiate SQS.
    const sqs = new aws.SQS();
    //Obtiene la variable del config
    var visibilityTimeOut = parseInt(config.QueueTiempoProcesamiento);
    var params = {
        AttributeNames: [
           "SentTimestamp"
        ],
        MaxNumberOfMessages: 1,
        MessageAttributeNames: [
           "All"
        ],
        QueueUrl: queueUrl,
        VisibilityTimeout: 1000,
        WaitTimeSeconds: 0
    };
    //Consulta mensaje pendiente en la cola
    sqs.receiveMessage(params, function(err, data) {
        if(err) {
            objresponse.end('Error recibiendo mensaje de la cola');
            console.log(`Error recibiendo mensaje de la cola: ${err}`)
        } else{
            var body = data.Messages[0].Body;
            console.log(`Mensaje de la cola: ${body}`);
            var ReceiptHandle = data.Messages[0].ReceiptHandle; 
            console.log(`receipt-id: ${ReceiptHandle}`);
            objresponse.status(200).send(data);
        } 
    });

}

///Método que realiza la eliminación del mensaje de la cola por id
function SQSEliminarMensaje(objrequest, objresponse){
    //Carga las credenciales e inicializa el objeto.
    aws.config.accessKeyId = process.env.accessKeyId;
    aws.config.secretAccessKey = process.env.secretAccessKey;
    aws.config.region = process.env.region;
    //aws.config.loadFromPath(__dirname + '/config.json');
    
    // Instantiate SQS.
    const sqs = new aws.SQS();
    //Se obtiene de los parámetros el id del video
    var _idMensaje = objrequest.body.idmensaje;
    console.log(`id mensaje: ${_idMensaje}`);
    var params = {
        QueueUrl: queueUrl,
        ReceiptHandle: _idMensaje
    };
    //Elimina mensaje de la cola
    sqs.deleteMessage(params, function(err, data) {
        if(err) {
            console.log(`Error eliminando mensaje de la cola: ${err}`)
            objresponse.end('Error');
        } 
        else {
            console.log('Eliminación correcta del mensaje: ${_idMensaje}')
            objresponse.end('success');
            
        } 
    });
}

//Se exportan los métodos
module.exports ={
    SQSCrearMensaje,
    SQSConsultarMensaje,
    SQSEliminarMensaje
}