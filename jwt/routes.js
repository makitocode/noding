'use strict'

const express = require('express');
//Instancia el objeto router para configurarlo
const api = express.Router();
//aws lib
const user = require('./controller/userController');
//middleware
const auth = require('./middleware/auth')

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEogIBAAKCAQBm0E0fcAFtOl3aV+/AX3yHA7WruP5mB5haZksgRiZe4b+PMn/L\n' +
    'lI9EumlF/UkOBRXpHUvRFpQwqPnECvrEIGFnxE/Zf188w/mv0RigXvtRSI9Yvlcs\n' +
    'U8ZuWQ3epdl2U6JUci7e34zH7tSbovZ6+9+7fbYvPbG9Ah0tM7fRSc08NFb+R667\n' +
    '5QkGpU3p+/Njt7kMz0aJfkAIjuOvSDu9wO+ofnpup8pRhBtXQYlMFADEyPpCNtxQ\n' +
    'HHbw1Mcb/R/LmRD3ILrlBcqjDJwWs8362I3r+hOaVMeeGZCFuXcG0khsd+0YXOt+\n' +
    '1VfGsuQa0idhwxJSgu9LwPHhVQtWptPoJ/79AgMBAAECggEABnPSM0PjQwijtT1J\n' +
    'lagod4y7DRDqHlshq6K52kesxs2iKQmBTbSAHU8ZpkPUHuYgzuWAyZmCKV+hdTU/\n' +
    'ManakxmV7U96GaUu+WLFCeOMIDjOjkI71FNZo7lBDpUYBb4P9P7JhEFBY5bQjwf2\n' +
    'Mhe2ndyw31we2H7Wd+zD/4WDNOD7qzqrDEDc7xg2gWPCLdzr5mopt7nO/UxgSQZZ\n' +
    'INhKFycjH8dKuX0qa9w+d2rawgRs1LFEd9UoPmqZZ+JjaLK42pYfLrVEwG8tVnnS\n' +
    'cTHDQggMzxAk95oCq9YaCNRB5NzbkOC3o0rfX4IayhNzH0ndkCtwFct7kQkMk68l\n' +
    'G812/QKBgQCkNJ8rFQUqGF7Xh4fOJ6xN7TK1h8gHrMygf4m/E1W0I6jLpBd92pk/\n' +
    'e4Hp1zNV58F2ZnDaRppt/I5JoSEf5mUEhc22H8pCegXPfq6bIx0eVdCkYK/xyeum\n' +
    'yUU8ivzf2Ec5ulacK79+JRKbXTNLPwc8Sa6ETh3Dty4CVoKaKwc97wKBgQCgSerY\n' +
    'vbkFNkebkU4kgt6OlI9M+8QeJeWkQjDAzu3B3wI7BumFnbNoNjTdqDT+dkHIYRbJ\n' +
    'o9QQkwBa1+xpw1XvmwcZIlFpjkxWWzNDNhPqVweVvuf9/ZJKt9y9gbp5oCf1y61F\n' +
    'rS31XhBs1GLYuoq8k1FCRS4UzNBbTPcNDXI90wKBgHB/CKj4XrBnP9rDJHxNW9OL\n' +
    'dNk/LABuF0bB+bnpYibm40aYpet4LtN6JxfwcmAhRb57EkfIZRaDF2xEMrBrJLwD\n' +
    'e1qRzvzaIk70iGUKmnFk82saPpAU+Rgr/f4rbnFg9/MJwTp/ElM2zNeZ84FSrf9U\n' +
    'r3Y/Gk8ymRfK8vDyF6ULAoGBAJYPfZC6Vbwea/2llF20M32ScXImBh4fZpVX7mKj\n' +
    'l404JdNzDi6sTCjVDrsxXaOYvM9GrdnKyZ9WsC9cFJWTbSGrpoKOUV+b+7WhHiXf\n' +
    'O9fY8F3t4y0zNsFCzqKQEC8LlD2WGDqx/ePH02K/l2bFhVs0JBAByjlo4euH64ZJ\n' +
    'v1lHAoGAOd3xi7yg7JNMj37hDdNREmnQc0aLw2DcErbRzNXUtVGt4+uqq90FFa5k\n' +
    'aJGzFnWjMu0RM9XtweVSAqRUuX9hJIBayr44hjYDbrM7+ATjdPShbh20ifmqzncX\n' +
    'ifh9kF7SJZP/JivwerNJ+Q2tM36SDq8aIHOJgoawR/TJ3Rtc6zs=\n' +
    '-----END RSA PRIVATE KEY-----';

const NodeRSA = require('node-rsa');

const key = new NodeRSA(privateKey);
key.setOptions({encryptionScheme: 'pkcs1'});
/*************************************** jwt logic ******************************/

api.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Content-Type, X-Amz-Date, Authorization, X-Api-Key, Origin, X-Requested-With, Accept");
   next();
});

api.post('/user/signin', user.SignIn);
api.post('/user/signup', user.SignUp);

api.get('/private', auth, (req, res)=>{
    res.status(200).send({message: 'Tienes acceso'});
});

api.post('/comprar', auth, (req, res)=>{
    const data = req.body.data;
    try{
        console.log('datos', data);
        const descifrado = descifrar(data);
        console.log('datos descifrados', descifrado);
        res.status(200).send({message: "El pago se realizó exitosamente"});
    }
    catch (e) {
        res.status(403).send({message: 'Se produjo un error. Por favor vuelva a intentarlo'});
    }
});

function descifrar(cipherText){
    return key.decrypt(cipherText, 'utf8');
}

//Export route module
module.exports = api;
