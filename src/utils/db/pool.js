const mysql = require('mysql')
const util = require("util");


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'remotemysql.com',
    user: 'wC73pny6kv',
    password: '1iPHTDOaIi',
    database: 'wC73pny6kv'
});

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