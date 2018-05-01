module.exports = {
    port: process.env.PORT || 2018,
    db: process.env.MONGODB || 'mongodb://localhost:27017/LumenLog',
    QueueUrl: '',
    QueueTiempoProcesamiento: '10', //segundos
    accessKeyId: "",
    secretAccessKey:"",
    region: "us-east"
}