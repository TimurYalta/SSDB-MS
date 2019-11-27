const express = require('express');
const router = express.Router();
const boardsServices = require('../services/boardsFileService');


router.get('/all', async (req, res, next) => {
    try{
        res.json(await boardsServices.getAllBoards()).status(200);
    }
    catch(err){
        console.log("Some bad stuff happened");
        console.log(err);
        res.status( 500).json(err);//..status(err.httpStatusCode || 500);
    }
});




// router.post('/put-note', async (req, res, next) => { 
//     console.log("PRISHOL")
//     console.log(JSON.stringify(req.body));
//     await notesServices.putNewNoteToFile(req.body);
//     res.end();
// });


module.exports = router;


// TODO: Create centalized error handler.