'use strict'

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//api
exports.CreateUser = functions.https.onRequest((request, response) => {
 //response.send("Hello from Firebase!");
 const age = request.body.age;
 const name = request.body.name;
 const username = request.body.username;

 admin.database.ref('dbTest/user').push({
     age: age,
     name: name,
     username: username
 }).then(res =>{
    console.log('Usuario registrado en la base de datos correctamente.');
 }).catch((err)=>{
    console.log(`Error ${err}, al insertar el usuario: ${err}`);
 });

 response.send('Usuario creado satisfactoriamente.');
});

//db triggers
exports.dbUserOnCreate = functions.database.ref('dbTest/user/{id}').onWrite(event => {
    console.log(`Se registró una escritura en la tabla user: ${event.data.val()}`);
});