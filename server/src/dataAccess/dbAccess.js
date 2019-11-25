// const mysql = require('mysql');

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'sql7.freemysqlhosting.net',
//     user: 'sql7312271',
//     password: '3tEJBW8TRz',
//     database: '	sql7312271'
// })
const pool = require('../dbUtils/pool');



const getAllNotesFromDB = () => {
    let results;
    console.log(213);
    return pool.query(
                "SELECT * FROM notes;",
                (err2, recs, fields)=>{
                    console.log("anythign")
                    console.log(recs);
                    if(!err2){
                        results = recs;
                    }
                    else{
                        console.log(err2);
                    }
                }
            );
        
    // return results;
}


module.exports = {getAllNotesFromDB};