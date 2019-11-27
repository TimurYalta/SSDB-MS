const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const readBoardsFromFile = () => readFile(path.join(rootDir, 'test_data' ,'boards.txt'));

const writeNotesToFile = (notes) => writeToFile(path.join(rootDir, 'test_data' ,'boards.txt'), notes);

module.exports = {
    readBoardsFromFile,
    writeNotesToFile
};