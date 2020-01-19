const fileAccess = require('./fileAccess');
const axios = require('axios');


const getAllBoards = async () => {
    try {
        const token = await fileAccess.readTokenFromFile();
        const boards = await axios.get(
            process.env.IOTRONIC_URL + '/v1/boards',
            {
                headers: {
                    "X-Auth-Token": token
                }
            });
        console.log(boards.data.boards);
        return boards.data.boards;
    } catch (error) {
        console.log('errpr');
        console.log(error);
        if (error.status == 401) {
            await issueToken();
            return await getAllBoards();
        }
        // throw error;
    }
};

const issueToken = async () => {
    try {
        const newToken = await axios.post(
            process.env.AUTH_URL + '/v3/auth/tokens',
            tokenObject,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return newToken.headers['x-subject-token'];
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

const tokenObject = {
    "auth": {
        "identity": {
            "methods": ["password"],
            "password": {
                "user": {
                    "name": process.env.USER,
                    "domain": { "id": "default" },
                    "password": process.env.PASSWORD
                }
            }
        },
        "scope": {
            "project": {
                "name": process.env.PROJECT,
                "domain": { "id": "default" }
            }
        }
    }
}



module.exports = { getAllBoards };