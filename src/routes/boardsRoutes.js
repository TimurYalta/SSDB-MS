const express = require('express');
const router = express.Router();
const boardsServices = require('../services/boardsDBService');


router.get('/all', async (req, res, next) => {
    try{
        const boards = await boardsServices.getAllBoards();
        console.log(boards);
        // for (el of boards){

        // }
        res.render('boards', {page:'Boards', menuId:'home', title: 'SSDB | Boards', boards});
        // res.render('index', {page:'Boards', menuId:'home', title: 'SSDB | Boards'});
        // res.json(boards);
        // res.end();x  `
    }
    catch(err){
        console.log("Some bad stuff happened");
        console.log(err);
        res.status( 500).json(err);//..status(err.httpStatusCode || 500);
    }
});


router.get('/info/:id', function (req, res, next) {
    console.log(req.params.id);
    res.send('USER');
});


// router.post('/put-note', async (req, res, next) => { 
//     console.log("PRISHOL")
//     console.log(JSON.stringify(req.body));
//     await notesServices.putNewNoteToFile(req.body);
//     res.end();
// });


module.exports = router;


// TODO: Create centalized error handler.