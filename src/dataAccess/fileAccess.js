const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const readTokenFromFile = () => readFile(path.join(rootDir, '..', 'authtoken'), "utf8");

const writeTokenToFile = (token) => writeToFile(path.join(rootDir,'..', 'authtoken'), token, {flag:'w'});

const writePolicyToFile = (id, policy) => {
    return writeToFile(path.resolve(__dirname, '..','..', 'plugins', id),
        policy,
        { flag: 'w' });
};

module.exports = {
    readTokenFromFile,
    writeTokenToFile,
    writePolicyToFile
};