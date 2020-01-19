const dbAccess = require('../dataAccess/dbAccess');
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/path');
const uuid = require('uuid/v4');
const moment = require('moment');
const fileAccess = require('../dataAccess/fileAccess');

const getAllDomains = async () => {
    console.log("Getting all notes from file");
    try {
        const readFromDB = await dbAccess.getAllDomainsFromDB();
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
        if (!res.devices) {
            return dbAccess.clearDomainDevices(id);
        }
        const devices = res.devices.map(JSON.parse);
        const strings = devices.map((el) => {
            return `('${id}', '${el.id}', '${el.name}')`;
        }).join(", ");
        await dbAccess.clearDomainDevices(id);
        return await dbAccess.setDomainDevices(strings);
    }
    catch (e) {
        console.log(123);
        throw e;
    }
};

const getNameByID = async (id) => {
    try {
        const name = await dbAccess.getDomainNameByID(id);
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

const getDomain = async (id) => {
    try {
        const domainInfo = await dbAccess.getDomainById(id);
        if (domainInfo.length > 0) {
            return domainInfo[0];
        }
        else {
            throw new Error("No such domain");
        }
    } catch (error) {
        console.log(error);
    }
}



const putNewDomainToDB = async (domain) => {
    try {
        domain.id = uuid();
        const currentTS = moment().format('YYYY-MM-DD HH:mm:ss')
        domain.creation_date = currentTS;
        domain.change_date = currentTS;
        const cols = Object.keys(domain).join(",");
        const rows = "'" + Object.values(domain).join("','") + "'";
        await dbAccess.writeDomainToDB(cols, rows);
        return new Promise((resolve) => { resolve() });

    }
    catch (e) {
        console.log("Got error in putting new note");
        console.log(e);
    }
};

const addPolicy = async (domainID, policyName, file) => {
    try {
        const id = uuid();
        await fileAccess.writePolicyToFile(id, file.data);
        const string = `('${domainID}','${id}', '${policyName}' )`;
        await dbAccess.writePolicy(string);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getPolicies = async (id) => {
    try {
        const policies = await dbAccess.getDomainPolicies(id);
        return policies;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getPolicyByID = async (id) => {
    try {
        
        const name = await dbAccess.getPolicyByID(id);
        // console.log(name);
        if (name.length==0){
            throw new Error("No such record");
        }
        return name;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    getAllDomains,
    putNewDomainToDB,
    getNameByID,
    getDevicesByID,
    getDevicesByID,
    updateDomainDeviceList,
    getDomain,
    addPolicy,
    getPolicies,
    getPolicyByID
}