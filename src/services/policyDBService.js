const dbAccess = require('../dataAccess/dbAccess');
const s4tAccess = require('../dataAccess/s4tAccess');
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/path');
const uuid= require('uuid');
const fileAccess = require('../dataAccess/fileAccess');


const getAllPolicies = async () => {
    try {
        const readFromDB = await dbAccess.getExtPolicies();
        return readFromDB;
    }
    catch (e) {
        console.log("Got error in getting all notes");
        console.log(e);
        throw e;
    }
};


const addPolicy = async (policyName, file) => {
    try {
        const id = uuid();
        await fileAccess.writePolicyToFile(id, file.data);
        const string = `('${id}', '${policyName}' )`;
        await dbAccess.writeExtremePolicy(string);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getPolicyByID = async (id) => {
    try {
        const policy = await dbAccess.getExtPolicyByID(id);
        if(policy.length==0){
            throw new Error("No policy found");
        }
        return policy[0];
        // const id = uuid();
        // await fileAccess.writePolicyToFile(id, file.data);
        // const string = `('${id}', '${policyName}' )`;
        // await dbAccess.writeExtremePolicy(string);
    } catch (error) {
        console.log(error);
        throw error;
    }
}





module.exports = {
    getPolicyByID,
    getAllPolicies,
    addPolicy
    // putNewNoteToFile
}