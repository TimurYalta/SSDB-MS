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

        console.log(cols);
        console.log(rows);
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


module.exports = {
    createUser,
    getUsers
}