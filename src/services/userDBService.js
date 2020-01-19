const dbAccess = require('../dataAccess/dbAccess');
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/path');
const uuid = require('uuid/v4');
const moment = require('moment');
const bcrypt = require('bcrypt');

const createUser = async (user) => {
    try {
        user.id = uuid();
        user.password = await bcrypt.hash(user.password, 10);
        const cols = Object.keys(user).join(",");
        const rows = "'" + Object.values(user).join("','") + "'";
        await dbAccess.writeUserToDB(cols, rows);
        // return new Promise((resolve) => { resolve() });

    }
    catch (e) {
        console.log("Got error in putting new note");
        console.log(e);
        throw e;
    }
};

const getUsers = async () => {
    try {
        const readFromDB = await dbAccess.getAllUsers();
        return readFromDB;
    } catch (error) {
        throw e;
    }
};

const getUserByID = async (id) => {
    try {
        const userInfo = await dbAccess.getUserByID(id);
        if (userInfo.length > 0) {
            return userInfo[0];
        }
        else {
            throw new Error("No such user");
        }
    } catch (error) {
        console.log(error);
    }
}

const getUserNameByID = async (id) => {
    try {
        const name = await dbAccess.getUserNameByID(id);
        console.log(name);
        return name;
    } catch (error) {
        console.log(error);
        throw e;
    }
};


const getDomainsByUserID = async (id) => {
    try {
        const domains = await dbAccess.getUserDomains(id);
        return domains;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateUserDomainList = async (id, res) => {
    try {
        if (!res.domains) {
            return dbAccess.clearUserDomains(id);
        }
        const domains = res.domains.map(JSON.parse);
        const strings = domains.map((el) => {
            return `('${id}', '${el.domain_id}', '${el.domain_name}')`;
        }).join(", ");
        await dbAccess.clearDomainDevices(id);
        return await dbAccess.setUserDomains(strings);
    }
    catch (e) {
        console.log(123);
        throw e;
    }
};





module.exports = {
    createUser,
    getUsers,
    getUserByID,
    getDomainsByUserID,
    getUserNameByID,
    updateUserDomainList
}