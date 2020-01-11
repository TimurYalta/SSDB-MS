const express = require('express');
const router = express.Router();
const authServices = require('../services/boardsFileService');


router.get('/login', async (req, res, next) => {
    try{
        res.render('auth/login', {page:'Login', menuId:'home', title: 'SSDB | Login'});
        // res.json(await boardsServices.getAllBoards()).status(200);
    }
    catch(err){
        console.log("Some bad stuff happened");
        console.log(err);
        res.status( 500).json(err);//..status(err.httpStatusCode || 500);
    }
});


router.post('/login', async (req, res, next) => {
    try{
        console.log(req.body);
        res.json(req.body);
        // res.render('login', {page:'Login', menuId:'home', title: 'SSDB | Login'});
        // res.json(await boardsServices.getAllBoards()).status(200);
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

module.exports = router;