//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs');
//modulo de node con funciones de criptografia
const crypto = require('crypto');
//Se obtiene el puerto desde una variable de entorno o se seta en 3000 si no se indica nda
var config = require('../config');

//db
const Sequelize = require('sequelize');
const connection = new Sequelize(config.Postgres_db, config.Postgres_user, config.Postgres_pass, 
                  {
                    host: config.Postgres_host,
                    dialect: 'postgres',
                    port: config.Postgres_port
                  });

const UsuarioSchema = connection.define('Usuario', {
    nombres: {type: Sequelize.STRING, allowNull: false},
    apellidos: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, unique: true, lowercase: true, allowNull: false},
    clave: {type: Sequelize.STRING, allowNull: false /*select:false*/}, //para que los get no retornen el password
    fechaRegistro: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    fechaUltimoIngreso: {type: Sequelize.DATE},
    // perfil: {type: Sequelize.STRING, enum: ['Admin', 'Concursante'], defaultValue: 'Admin'}
  }, {
      timestamps: false,
      freezeTableName: true, //Evita que pluralice el nombre de la BD
      hooks: {
        //   beforeCreate: SetPassword(this).then(()=> {return true;}).catch(err => {throw new Error(err)})
      }
  });

// function SetPassword(user){
//     return new Promise((resolve, reject)=>{
//         bcrypt.genSalt(10, (err, salt) => {   
//             if (err) reject(err);  
//             bcrypt.hash(user.clave, salt, null, (err, hash) => {
//                if (err) reject(err);  
//                user.clave = hash  
//                resolve();
//              })
//           })
//     });
// }

UsuarioSchema.sync({logging: console.log}).then(function(){
    console.log(`Modelo Usuario Actualizado`)
}).catch((err)=>{
    console.log(`Error sincronizando el modelo Usuario ${err}`)
});


//Para exportar el modelo creado
module.exports = UsuarioSchema ;