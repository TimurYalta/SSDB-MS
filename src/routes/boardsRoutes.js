const express = require('express');
const router = express.Router();
const boardsServices = require('../services/boardsDBService');


router.get('/all', async (req, res, next) => {
    try {
        const boards = await boardsServices.getAllBoards();
        res.render('boards/boards', { page: 'Boards', menuId: 'home', title: 'SSDB | Boards', boards });
    }
    catch (err) {
        console.log("Some bad stuff happened");
        console.log(err);
        res.status(500).json(err);}
});



router.get('/info/:id', async (req, res, next) => {
    try {
        const info = await boardsServices.getBoardDomains(req.params.id);
        res.render('boards/boardInfo', {
            page: 'Boards',
            menuId: 'home',
            title: 'SSDB | Boards',
            info:{name:123},
            domains
        });
    } catch (e) {
        console.log(e);
    }
});



module.exports = router;


// TODO: Create centalized error handler.