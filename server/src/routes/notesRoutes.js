const express = require('express');
const router = express.Router();
const notesServices = require('../services/notesDBService');


router.get('/get-notes', async (req, res, next) => {
    console.log(213);
    res.send(await notesServices.getNotes());
    res.end();
});

// router.post('/put-note', async (req, res, next) => { 
//     console.log("PRISHOL")
//     console.log(JSON.stringify(req.body));
//     await notesServices.putNewNoteToFile(req.body);
//     res.end();
// });


module.exports = router;