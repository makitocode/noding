module.exports = {
    port: process.env.PORT || 2018,
    db: process.env.MONGODB || 'mongodb://localhost:27017/{DATABASENAME}',
    QueueUrl: '',
    QueueTiempoProcesamiento: '', //segundos
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east"
}