'use strict'
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const user = require('./api/user');

// var serviceAccount = require("path/to/serviceAccountKey.json");
var serviceAccount = require("./config/functiontest-2f89e-firebase-adminsdk-010l1-71cb9c6001");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://functiontest-2f89e.firebaseio.com"
});


/* ****************************************************************************************
::::::::::::::::::::::::::::::::::::::: HTTP Functions ::::::::::::::::::::::::::::::::::::
**************************************************************************************** */
//api -> POST
exports.CreateUser = functions.https.onRequest(user.CreateUser);
//api -> GET
exports.GetUsers = functions.https.onRequest(user.GetUsers);
//api -> PUT
exports.UpdateUsers = functions.https.onRequest(user.UpdateUser);
/* ****************************************************************************************
::::::::::::::::::::::::::::::::::::::: DB Trigers ::::::::::::::::::::::::::::::::::::
**************************************************************************************** */
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