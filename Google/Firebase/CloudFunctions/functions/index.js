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

//api
exports.CreateUser = functions.https.onRequest((request, response) => {
    if (request.method === 'POST') {
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

//db triggers
exports.dbUserOnCreate = functions.database.ref('dbTest/user/{id}').onWrite(event => {
    console.log(`Se registró una escritura en la tabla user: ${event.data.val()}`);
});