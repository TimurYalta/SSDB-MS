const express = require('express');
const router = express.Router();
const userService = require('../services/userDBService');
const domainServices = require('../services/domainsDBService');


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

router.get('/info/:id', async (req, res, next) => {
    try {
        const info = await userService.getUserByID(req.params.id);
        res.render('users/userInfo',{
            page:'Users',
            menuId:'home',
            title: 'SSDB | Users', 
            info
        });
    } catch (e) {
        console.log(e);
    }
});


router.get('/edit/:id', async (req, res, next) => {
    try {
        console.log(`here`);
        const user = await userService.getUserNameByID(req.params.id);
        const userDomains = await userService.getDomainsByUserID(req.params.id);
        const allDomains = await domainServices.getAllDomains();
        res.render('users/userDomainList',
            {
                id: req.params.id,
                page: 'Domains',
                menuId: 'home',
                title: 'SSDB | Domains',
                userDomains,
                domains: allDomains,
                user
            });
    }
    catch (err) {
        console.log("Some bad stuff happened");
        console.log(err);
        res.status(500).json(err);//..status(err.httpStatusCode || 500);
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        console.log(req.body);
        await userService.updateUserDomainList(req.params.id, req.body);
        const users = await userService.getUsers();
        res.render('users/users', { page: 'Users', menuId: 'users', title: 'SSDB | Users', users});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});



module.exports = router;