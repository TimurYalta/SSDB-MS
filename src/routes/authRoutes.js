const express = require('express');
const passport = require('passport');
const router = express.Router();
const authVerify = require('../utils/authVerification');

router.get('/login', authVerify.checkNotAuthenticated, async (req, res, next) => {
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

router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/login');
});


// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

// router.post('/login', async (req, res, next) => {
//     try{
//         console.log(req.body);
//         res.json(req.body);
//         // res.render('login', {page:'Login', menuId:'home', title: 'SSDB | Login'});
//         // res.json(await boardsServices.getAllBoards()).status(200);
//     }
//     catch(err){
//         console.log("Some bad stuff happened");
//         console.log(err);
//         res.status( 500).json(err);//..status(err.httpStatusCode || 500);
//     }
// });

router.get('/info/:id', function (req, res, next) {
    console.log(req.params.id);
    res.send('USER');
});

module.exports = router;