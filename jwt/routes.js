'use strict'

const express = require('express');
//Instancia el objeto router para configurarlo
const api = express.Router();
//aws lib
const user = require('./controller/userController');
//middleware
const auth = require('./middleware/auth')

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
    '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\n' +
    '-----END RSA PRIVATE KEY-----';

const jsencrypt = require('jsencrypt');
const JSEncrypt = new jsencrypt.JSEncrypt();
JSEncrypt.setPrivateKey(privateKey);
/*************************************** jwt logic ******************************/

api.post('/user/signin', user.SignIn);
api.post('/user/signup', user.SignUp);

api.get('/private', (req, res)=>{
    const sample = 'IdZvR3fX1mZTB9XYON79DmepERDSqE8+v6ft7O9rrfA1Z4h7hwjhz+nANIg+qMJ+s6HdW4cZW1PmfFlUIyGT6ij0ONkdhGKVJqBOdaio1bMEosmooqSgO8Yu9AHuSu6nm5hslLXRj0ABjrKuqTrV8H2xxLQBvbtV0nzpdBg9GUP3cUY8/ztQf6X1tf2llOYcYeK+zgJGGQo4rnTYIISZ69D46t9iWIvQe+EX/kdw+BubodvkvZWabYfQe+vXqh70oXGOkfQfLAHRtKn62rtwS0QMf1ulcoLu0cOufjf9B7BGOfDt+m5LFD+vegq+191pW1x7dY+mzWXVwqZzLM87P8nikIlxUgLh4FakNvlAiPBEsudvR6nZZFEBh3OUnxUS2wZrqJnQPZc51StsmZj9ghGmU4aOSCg+/WVK7sGDEYce6P1KlOlY08mRSc8aYrVfC6fLqCKQfBkmOaWHp6V9NuG8PwYT3UeQ0zLOieBycrUDgAwb9Hr8DqIX46aReQakN4mvYMlPvxQZiWGvb5ZSjDbCBcb8cgqgitOSMTelX/DTGNPvHa2eHV1SR5eJmTjTkB73IJLtXVw9LXzscPTU5gVNHJ5z7YADpDpkCJufFgHSBp3YkgdIP7/dnyslZXT+TxJCZXU6aaD1xOM0RVXVBv7/35nSWKOvpxJldkNwBzI=';
    const descifrado = descifrar(sample);
    console.log(descifrado);
    res.status(200).send({message: 'Tienes acceso'});
});

function descifrar(cipherText){
    return JSEncrypt.decrypt(cipherText);
}


//Export route module
module.exports = api