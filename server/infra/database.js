// conexao banco de dados
const pgp = require('pg-promise')();

const db = pgp({
    user:'postgres',
    password:'torre',
    host: 'localhost',
    port:'5432',
    database: 'kmcollaborator'
})
module.exports = db;