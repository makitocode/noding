'use strict'

//Se obtiene el puerto desde una variable de entorno o se seta en 3000 si no se indica nda
var config = require('./config')
//Referencia al app
var app = require('./app')
//db
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.Postgres_db, config.Postgres_user, config.Postgres_pass, 
                  {
                    host: config.Postgres_host,
                    dialect: 'postgres',
                    port: config.Postgres_port
                  });

//Habilita el escucha por el puerto seleccionado
//****Mysql****
sequelize.authenticate().then(() => {
        console.log('Connection with Postgresql has been established successfully...   :) ');
        app.listen(config.port, () => {
        console.log(`Api rest corriendo correctamente con postgres en el puerto ${config.port}`)
        })
}).catch(err => {
    console.log(`Error al conectar a la base de datos: ${err}`)
});
