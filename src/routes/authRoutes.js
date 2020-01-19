const express = require('express');
const passport = require('passport');
const router = express.Router();
const authVerify = require('../utils/authVerification');

router.get('/login', authVerify.checkNotAuthenticated, async (req, res, next) => {
    try{
        res.render('auth/login', {page:'Login', menuId:'home', title: 'SSDB | Login'});
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

module.exports = router;