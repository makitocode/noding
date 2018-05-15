'use strict'

//Para usar el modelo hay q importarlo
const Usuario = require('../model/user');
//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs');
//modulo de node con funciones de criptografia
const crypto = require('crypto');
//Servicio de decodificación y codificación de token -lógica del jwt
const service = require('../service/index');

/*************************************** POST ******************************/
//Obtener Usuario por correo
//pendiente enviar clave encriptada para validar
function IniciarSesion(objrequest, objresponse){
    var _email = objrequest.params.email
    var _pass = objrequest.body.clave
    Usuario.findOne({ where: {email: _email, clave: _pass}}).then((_usuario)=>{
        if(!_usuario){
            console.log(`Usuario o contraseña inconrrecta`)
            objresponse.status(404).send({mensaje: 'Usuario o contraseña inconrrecta'})
        }
        else{
            _usuario.clave = ''
            objresponse.status(200).send({usuario: _usuario})
        }
    }).catch((err) => {
        console.log(`Error iniciando sesión: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}

//Crear usuario
function CrearUsuario(objrequest, objresponse){
    var _usuario = new Usuario();
    _usuario.nombres = objrequest.body.nombres;
    _usuario.apellidos = objrequest.body.apellidos;
    _usuario.email = objrequest.body.email;
    _usuario.clave = objrequest.body.clave;

    //Se almacena el usuario
    _usuario.save(_usuario).then((_UsuarioGuardado)=>{
        if(!_UsuarioGuardado)
            objresponse.status(400).send({mensaje: "Error al crear el usuario"})
        else
        {
            objresponse.status(200).send({usuario: _UsuarioGuardado})
        }
    }).catch((err)=>{
        console.log(`Error creando usuario: ${err}`)
        objresponse.status(500).send({mensaje: "Error al crear el usuario"})
    })
}

/*************************************** JWT ******************************/

function SignUp(req, res){
    var _usuario = new Usuario({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        email: req.body.email,
        clave: req.body.clave
    });
    //Se almacena el usuario
    _usuario.save(_usuario).then((_UsuarioGuardado)=>{
        if(!_UsuarioGuardado)
            res.status(400).send({mensaje: "Error al crear el usuario"});
        else
        {
            res.status(200).send({token: service.createToken(_usuario)});
        }
    }).catch((err)=>{
        console.log(`Error creando usuario: ${err}`)
        res.status(500).send({mensaje: "Error al crear el usuario"})
    })
}

function SignIn(req, res){
    var _idUsuario = req.body.email;
    Usuario.findOne({ where: {email: _idUsuario} }).then((_usuario)=>{
        if(!_usuario){
            res.status(404).send({mensaje: 'El usuario no existe'})
        }
        else{
            _usuario.clave = ''
            res.status(200).send({mensaje: 'Usuario logueado exitosamente', token: service.createToken(_usuario)})
        }
    }).catch((err) => {
        return res.status(500).send({mensaje: `Error interno del servicio: ${err}`})
    })
}

//Se exportan los métodos
module.exports ={
    SignUp,
    SignIn
}