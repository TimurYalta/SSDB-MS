const pool = require('../utils/db/pool');

const getDomainById = (id) => {
    return pool.query(`SELECT * FROM domains WHERE id ='${id}'`);
}

const getDomainNameByID = (id) => {
    return pool.query(`SELECT name FROM domains WHERE id='${id}'`);
};

const clearDomainDevices=(id) => {
    return pool.query(`DELETE FROM domain_devices WHERE domain_id='${id}'`);
};

const setDomainDevices = (string) => {
    return pool.query(`INSERT INTO domain_devices (domain_id, board_id, board_name) VALUES ${string}`);
};

const getBoardById = (id) => {
    return pool.query("SELECT * FROM boards WHERE id ="+id);
}

const getDomainDevicesByID = (id) => {
    return pool.query(`SELECT board_id FROM domain_devices WHERE domain_id ='${id}'`)
} 

const getAllBoardsFromDB = () => {
    return pool.query("SELECT * FROM boards;");
}

const getAllDomainsFromDB = () => {
    return pool.query(`SELECT * FROM domains`);
};

const writeDomainToDB = (cols, vals) => {
    return pool.query(`INSERT INTO domains (${cols}) VALUES  (${vals})`);
}

const getUserByUserName = (username) => {
    return pool.query(`SELECT * FROM users where username = '${username}'`);
};

const getUserByID = (id) => {
    return pool.query(`SELECT * FROM users where id = '${id}'`);
};

const writeUserToDB = (cols,vals) => {
    return pool.query(`INSERT INTO users (${cols}) VALUES  (${vals})`);
};

const getAllUsers = () =>{
    return pool.query(`SELECT * FROM users`);
};


module.exports = { 
    setDomainDevices,
    clearDomainDevices,
    getAllBoardsFromDB,
    writeDomainToDB,
    getAllDomainsFromDB,
    getDomainNameByID,
    getDomainDevicesByID,
    getDomainById,
    getUserByUserName,
    getUserByID,
    writeUserToDB,
    getAllUsers
};