const dbAccess = require('../dataAccess/dbAccess');
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/path');
const uuid = require('uuid/v4');
const moment = require('moment');

const getAllDomains = async () => {
    console.log("Getting all notes from file");
    try {
        const readFromDB = await dbAccess.getAllDomainsFromDB();
        console.log(readFromDB);
        console.log(2134);
        // const convertedToObject = JSON.parse(await readFromDB.json());
        return readFromDB;

    }
    catch (e) {
        console.log("Got error in getting all notes");
        console.log(e);
        throw e;
    }
};


const updateDomainDeviceList = async (id, res) => {
    try {
        if(!res.devices){
            return dbAccess.clearDomainDevices(id);
        }
        const devices = res.devices.map(JSON.parse);
        const strings = devices.map((el) => {
            return `('${id}', '${el.id}', '${el.name}')`;
        }).join(", ");
        await dbAccess.clearDomainDevices(id);
        return await dbAccess.setDomainDevices(strings);
    }
    catch(e){
        console.log(123);
        throw e;
    }
};

const getNameByID = async (id) => {
    try {
        const name = await dbAccess.getDomainNameByID(id);
        console.log(name)
        return name;
    }
    catch (e) {
        console.log(e);
    }
};

const getDevicesByID = async (id) => {
    try {
        const devices = await dbAccess.getDomainDevicesByID(id);
        return devices;
    } catch (e) {
        console.log(e);
    }
};


const putNewDomainToDB = async (domain) => {
    try {
        domain.id = uuid();
        const currentTS = moment().format('YYYY-MM-DD HH:mm:ss')
        domain.creation_date = currentTS;
        domain.change_date = currentTS;
        const cols = Object.keys(domain).join(",");
        const rows = "'" + Object.values(domain).join("','") + "'";

        console.log(cols);
        console.log(rows);
        await dbAccess.writeDomainToDB(cols, rows);
        return new Promise((resolve) => { resolve() });

    }
    catch (e) {
        console.log("Got error in putting new note");
        console.log(e);
    }
};



module.exports = {
    getAllDomains,
    putNewDomainToDB,
    getNameByID,
    getDevicesByID,
    getDevicesByID,
    updateDomainDeviceList
    // putNewNoteToFile
}