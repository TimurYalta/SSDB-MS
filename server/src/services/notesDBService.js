const dbAccess = require('../dataAccess/dbAccess');
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/path');


const getNotes = async () => {
    console.log("Getting all notes from file");
    try {
        const readFromDB = await dbAccess.getAllNotesFromDB();
        console.log(readFromDB);
        const convertedToObject = JSON.parse(await  readFromDB.json());
        return convertedToObject;

    }
    catch (e) {
        console.log("Got error in getting all notes");
        console.log(e);
    }
};

// const putNewNoteToFile = async (note) => {
//     try { 
//         const readFromDB = await dbAccess.getAllNotesFromDB();
//         console.log(note.body);
//         const convertedToObject = JSON.parse(readFromDB.toString());
//         convertedToObject.notes.push(note);
//         await dbAccess.writeNotesToFile(JSON.stringify(convertedToObject));

//     }
//     catch (e) {
//         console.log("Got error in putting new note");
//         console.log(e);
//     }
// };



module.exports = {
    getNotes,
    // putNewNoteToFile
}