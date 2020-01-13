const express = require('express');
const router = express.Router();
const userService = require('../services/userDBService');


router.get('/create', async (req, res, next) => {
    try{
        res.render('users/createUser', {page:'Boards', menuId:'home', title: 'SSDB | Boards'});
        // res.json(await boardsServices.getAllBoards()).status(200);
    }
    catch(err){
        console.log("Some bad stuff happened");
        console.log(err);
        res.status( 500).json(err);//..status(err.httpStatusCode || 500);
    }
});

router.post('/create', async (req, res, next) => {
    try{
        await userService.createUser(req.body);
        res.render('users/createUser', {page:'Boards', menuId:'home', title: 'SSDB | Boards'});
    }
    catch(err){
        console.log("Some bad stuff happened");
        console.log(err);
        res.status( 500).json(err);//..status(err.httpStatusCode || 500);
    }
});

router.get('/all', async (req,res, next)=>{
    try {
        const users = await userService.getUsers();
        res.render('users/users', { page: 'Users', menuId: 'home', title: 'SSDB | Users', users });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
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