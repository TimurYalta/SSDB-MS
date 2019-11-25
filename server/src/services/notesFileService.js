const fileAccess = require('../dataAccess/fileAccess');
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/path');


const getAllNotesFromFile = async () => {
    console.log("Getting all notes from file");
    try {
        const readFromFile = await fileAccess.readNotesFromFile();
        console.log(readFromFile);
        const convertedToObject = JSON.parse(readFromFile.toString());
        return convertedToObject;
        //convertedToObject;
    }
    catch (e) {
        console.log("Got error in getting all notes");
        console.log(e);
    }
};

const putNewNoteToFile = async (note) => {
    try { 
        const readFromFile = await fileAccess.readNotesFromFile();
        console.log(note.body);
        const convertedToObject = JSON.parse(readFromFile.toString());
        convertedToObject.notes.push(note);
        await fileAccess.writeNotesToFile(JSON.stringify(convertedToObject));

    }
    catch (e) {
        console.log("Got error in putting new note");
        console.log(e);
    }
};



module.exports = {
    getAllNotesFromFile,
    putNewNoteToFile
}