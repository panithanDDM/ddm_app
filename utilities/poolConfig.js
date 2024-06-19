const { Pool } = require('pg')


const pool = new Pool({
    user: 'postgres',
    password: 'new_password',
    host: '27.254.65.111',
    port: 5432,
    database: 'ddm'
})
module.exports = { pool }


// const { Pool } = require('pg')


// const pool = new Pool({
//     user: 'postgres',
//     password: 'remote',
//     host: 'localhost',
//     port: 5432,
//     database: 'ddm_app'
// })
// module.exports = { pool }
