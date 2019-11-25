const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const readNotesFromFile = () => readFile(path.join(rootDir, 'test_data' ,'notes.txt'));

const writeNotesToFile = (notes) => writeToFile(path.join(rootDir, 'test_data' ,'notes.txt'), notes);

module.exports = {
    readNotesFromFile,
    writeNotesToFile
};