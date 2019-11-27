const mysql = require('mysql')
const util = require("util");


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7312271',
    password: '3tEJBW8TRz',
    database: 'sql7312271'
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})
pool.query = util.promisify(pool.query);

module.exports = pool