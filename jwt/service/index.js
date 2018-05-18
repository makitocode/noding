'use strict'
//Lib jwt
const jwt = require('jwt-simple');
//Lib para simplificar el manejo de fechas
const moment = require('moment');
//Config
const config = require('../config');

function createToken(user){
    const payload = {
        sub: user.id,
        //Fecha de creación del token
        iat: moment().unix(),
        //Fecha de expiración del token
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, /*Secret*/config.secret_token);
}

function decodeToken(token){
    return new Promise((resolve, reject)=> {
        try {
            const payload = jwt.decode(token, config.secret_token);
            if(payload.exp <= moment().unix()){
                reject({status: 401, mensaje: 'El token ha expirado'});
            }
            resolve(payload.sub);
        } catch (error) {
            reject({status: 500, mensaje: 'Token inválido'});
        }
    });
}

module.exports = {
    createToken,
    decodeToken
};