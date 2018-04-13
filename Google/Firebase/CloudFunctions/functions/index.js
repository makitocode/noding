'use strict'

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//db triggers
exports.dbUserOnCreate = functions.database.ref('dbTest/user/{id}').onWrite(event => {
    console.log(`Se registró una escritura en la tabla user: ${event.data.val()}`);
});