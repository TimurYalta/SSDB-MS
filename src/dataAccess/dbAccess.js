// const mysql = require('mysql');

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'sql7.freemysqlhosting.net',
//     user: 'sql7312271',
//     password: '3tEJBW8TRz',
//     database: '	sql7312271'
// })
const pool = require('../utils/db/pool');



const getAllBoardsFromDB = () => {
    let results;
    console.log(213);
    return pool.query("SELECT * FROM boards;");
    // return new Promise((resolve,reject) => {
    //     pool.query(
    //         "SELECT * FROM boards;",
    //         (err2, recs, fields) => {
    //             // console.log("anythign")
    //             // console.log(recs);
    //             if (!err2) {
    //                 results = recs;
    //                 console.log(recs);
    //                 resolve(recs);
    //                 return recs;
    //             }
    //             else {
    //                 reject(err2);
    //                 console.log(err2);
    //             }
    //         }
    //     );
    // });

    // return results;
}


module.exports = { getAllBoardsFromDB };