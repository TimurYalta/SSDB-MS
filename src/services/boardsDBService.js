const dbAccess = require('../dataAccess/dbAccess');
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/path');


const getAllBoards = async () => {
    console.log("Getting all notes from file");
    try {
        const readFromDB = await dbAccess.getAllBoardsFromDB();
        console.log(readFromDB);
        console.log(2134);
        // const convertedToObject = JSON.parse(await readFromDB.json());
        return readFromDB;

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
    getAllBoards
    // putNewNoteToFile
}