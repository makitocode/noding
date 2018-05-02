'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo en mongodb
const LogSchema = Schema({
    error: String,
    id: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Log', LogSchema);