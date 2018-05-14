'use strict'

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

//Se exportan los métodos
module.exports ={
    IniciarSesion
}