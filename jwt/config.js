module.exports = {
    port: process.env.PORT || 2018,
    //db: process.env.MONGODB || 'mongodb://localhost:27017/viccon',
    Postgres_db: 'proveedores_dev',
    Postgres_user: 'postgres',
    Postgres_pass: 'postgres',
    Postgres_host: 'localhost',
    Postgres_port: '5432',
    secret_token: 'miclavedetokens'
}