const dbAccess = require('../dataAccess/dbAccess');
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/path');
const uuid = require('uuid/v4');
const moment = require('moment');

const getUserByUserName = async (userName) => {
    try {
        const readFromDB = await dbAccess.getUserByUserName(userName);
        if (readFromDB.length == 0) {
            return null;
        }
        return readFromDB[0];

    }
    catch (e) {
        console.log("Got error in getting all notes");
        console.log(e);
        throw e;
    }
};

const getUserByID = async (id) => {
    try {
        const readFromDB = await dbAccess.getUserByID(id);
        if (readFromDB.length == 0) {
            return null;
        }
        console.log(readFromDB);
        return readFromDB[0];

    }
    catch (e) {
        console.log("Got error in getting all notes");
        console.log(e);
        throw e;
    }
};



module.exports = {
    getUserByUserName,
    getUserByID
}