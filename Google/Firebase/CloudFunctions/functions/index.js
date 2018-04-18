'use strict'

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

// var serviceAccount = require("path/to/serviceAccountKey.json");
var serviceAccount = require("./config/functiontest-2f89e-firebase-adminsdk-010l1-71cb9c6001");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://functiontest-2f89e.firebaseio.com"
});

//api -> POST
exports.CreateUser = functions.https.onRequest((request, response) => {
    if (request.method == 'POST') {
        const newAge = request.body.age;
        const newName = request.body.fullname;
        const newUsername = request.body.username;

        admin.database().ref('dbTest/user').push({
            age: newAge,
            name: newName,
            username: newUsername
        }).then(res =>{
            console.log('Usuario registrado en la base de datos correctamente.');
        }).catch((err)=>{
            console.log(`Error ${err}, al insertar el usuario: ${err}`);
        });
        response.send('Usuario creado satisfactoriamente.');
    }
    else{
        return response.status(403).send('Forbidden!');
    }
});

//api -> GET
exports.GetUsers = functions.https.onRequest((request, response) => {
    if(request.method == 'GET')
    {
        admin.database().ref('dbTest/user').once('value').then((snapshot)=>{
            if(!snapshot){
                response.status(404).send({mensaje: 'No existen usuarios registrados'});
            }
            if(snapshot.val().length <= 0){
                response.status(404).send({mensaje: 'No existen usuarios registrados.'});
            }
            else{
                console.log(snapshot);
                // for (let value of snapshot) {
                //     Console.log(value.val());
                // }
                response.status(200).send({usuarios: snapshot});
            }
        }).catch((err)=> {
            console.log(`Error al obtener usuarios. ${err}`);
        });
    }
    else{
        return response.status(403).send('Forbidden!');
    }
});

//api -> PUT
exports.UpdateUsers = functions.https.onRequest((request, response) => {
    if(request.method == 'PUT')
    {
        const userId = request.query.id;
        console.log(`id de usuario: ${userId}`);
        console.log(`params: ${request.params}`);
        console.log(`id param: ${request.userId}`);
        const newAge = request.body.age;
        const newName = request.body.fullname;
        const newUsername = request.body.username;
        
        admin.database().ref(`dbTest/user/${userId}`).set({
            age: newAge,
            name: newName,
            username: newUsername
        }).then(res =>{
            console.log(`Usuario ${newName} actualizado correctamente.`);
        }).catch((err)=>{
            console.log(`Error ${err}, al insertar el usuario: ${newName}`);
        });
        response.send(`Usuario ${newName} actualizado correctamente.`);
    }
    else{
        return response.status(403).send('Forbidden!');
    }
});

//db triggers -> Create
exports.dbUserOnCreate = functions.database.ref('dbTest/user/{id}').onWrite(event => {
    console.log(`Se registró una escritura en la tabla user: ${userId}`);
    return true;
});
//db triggers -> Update
exports.dbUserOnUpdate = functions.database.ref('dbTest/user/{id}').onUpdate(event => {
    console.log(`Se actualizó un registro en la tabla user: ${userId}`);
    return true;
});