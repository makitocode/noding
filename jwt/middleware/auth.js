'use strict'

const service = require('../service/index');
//Config
const Config = require('../config');

function isAuth(req, res, next){
    if(!req.headers.authorization){
        //No existe un campo de autorization en el header
        return res.status(401).send({mensaje: 'No tienes autorización'})
    }
    const token = req.headers.authorization.split(' ')[1];
    
    service.decodeToken(token).then(respuesta => {
        req.user = respuesta;
        next();
    }).catch(err => {
        res.status(err.status).send({mensaje: err.mensaje})
    })
}

module.exports = isAuth;