const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const readTokenFromFile = () => readFile(path.join(rootDir,'authtoken'));

const writeTokenToFile = (token) => writeToFile(path.join(rootDir ,'authtoken'), token);

module.exports = {
    readTokenFromFile,
    writeTokenToFile
};