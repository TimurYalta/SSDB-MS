const pool = require('../utils/db/pool');

const getDomainById = (id) => {
    return pool.query(`SELECT * FROM domains WHERE id ='${id}'`);
}

const getDomainNameByID = (id) => {
    return pool.query(`SELECT name FROM domains WHERE id='${id}'`);
};

const clearDomainDevices = (id) => {
    return pool.query(`DELETE FROM domain_devices WHERE domain_id='${id}'`);
};

const setDomainDevices = (string) => {
    return pool.query(`INSERT INTO domain_devices (domain_id, board_id, board_name) VALUES ${string}`);
};
const setUserDomains = (string) => {
    return pool.query(`INSERT INTO user_domains (user_id, domain_id, domain_name) VALUES ${string}`);
};

const getBoardById = (id) => {
    return pool.query("SELECT * FROM boards WHERE id =" + id);
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

const writeUserToDB = (cols, vals) => {
    return pool.query(`INSERT INTO users (${cols}) VALUES  (${vals})`);
};

const getAllUsers = () => {
    return pool.query(`SELECT * FROM users`);
};

const getUserNameByID = (id) => {
    return pool.query(`SELECT username FROM users WHERE id ='${id}'`)
};

const getUserDomains = (id) => {
    return pool.query(`SELECT * FROM user_domains WHERE user_id='${id}'`);
};

const clearUserDomains = (id) => {
    return pool.query(`DELETE FROM user_domains WHERE user_id='${id}'`);
};

const writePolicy = (string) => {
    return pool.query(`INSERT INTO domain_policy (domain_id, file_id, policy_name) VALUES ${string}`);
};

const writeExtremePolicy = (string) => {
    return pool.query(`INSERT INTO extreme_policy (id, name) VALUES ${string}`);
};

const getDomainPolicies = (id) => {
    return pool.query(`SELECT * FROM domain_policy WHERE domain_id='${id}'`);
};

const getPolicyByID = (policy_id) => {
    return pool.query(`SELECT * FROM domain_policy WHERE file_id='${policy_id}'`);
};

const getExtPolicies = () => {
    return pool.query(`SELECT * FROM extreme_policy`);
};

const getExtPolicyByID = (id) => {
    return pool.query(`SELECT * FROM extreme_policy WHERE id='${id}'`);
};



module.exports = {
    getExtPolicyByID,
    getExtPolicies,
    getDomainPolicies,
    getPolicyByID,
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
    getAllUsers,
    getUserDomains,
    clearUserDomains,
    getUserNameByID,
    setUserDomains,
    writePolicy,
    writeExtremePolicy
};