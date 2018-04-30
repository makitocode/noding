module.exports = {
    port: process.env.PORT || 2018,
    db: process.env.MONGODB || 'mongodb://localhost:2018/viccon',
    QueueUrl: '',
    QueueTiempoProcesamiento: '40' //segundos
}