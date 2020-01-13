const express = require('express');
const router = express.Router();
const domainServices = require('../services/domainsDBService');


router.get('/all', async (req, res, next) => {
    try {
        console.log(req.user);
        const domains = await domainServices.getAllDomains();
        // console.log(domains);
        res.render('domains/domains', { page: 'Domains', menuId: 'home', title: 'SSDB | Domains', domains });
        // res.render('index', {page:'Boards', menuId:'home', title: 'SSDB | Boards'});
        // res.json(boards);
        // res.end();x  `
    }
    catch (err) {
        console.log("Some bad stuff happened");
        console.log(err);
        res.status(500).json(err);//..status(err.httpStatusCode || 500);
    }
});

router.get('/edit/:id', async (req, res, next) => {
    try {
        const name = await domainServices.getNameByID(req.params.id);
        // console.log(name);
        const domainDevices = await domainServices.getDevicesByID(req.params.id);
        // const currentDomainDeviceList = await domainServices.getDevicesByID(req.params.id);
        const allDeviceList = [{ name: "213", id: 1 }, { name: "213fsa", id: 2 }, { name: "4", id: 3 }];
        // res.send(domainBoards);
        console.log(domainDevices);
        res.render('domains/domainDeviceEdit',
            {
                id: req.params.id,
                page: 'Domains',
                menuId: 'home',
                title: 'SSDB | Domains',
                domainDevices,
                boards: allDeviceList,
                domainName: name
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
        await domainServices.updateDomainDeviceList(req.params.id, req.body);
        const domains = await domainServices.getAllDomains();
        res.render('domains/domains', { page: 'Domains', menuId: 'home', title: 'SSDB | Domains', domains });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


router.get('/info/:id', async (req, res, next) => {
    try {
        const info = await domainServices.getDomain(req.params.id);
        res.render('domains/domainInfo',{
            page:'Domains',
            menuId:'home',
            title: 'SSDB | Domains', 
            info
        });
    } catch (e) {
        console.log(e);
    }
});


router.get('/create', async (req, res, next) => {
    console.log("Create");
    console.log(JSON.stringify(req.body));
    // await notesServices.putNewNoteToFile(req.body);
    res.render('domains/domainCreate', { page: 'Create Domain', menuId: 'home', title: 'SSDB | Create domain' });
    res.end();
});

router.post('/create', async (req, res, next) => {
    console.log("Create");
    console.log(JSON.stringify(req.body));
    await domainServices.putNewDomainToDB(req.body);

    res.render('domains/domainCreate', { page: 'Create Domain', menuId: 'home', title: 'SSDB | Create domain' });

    res.end();
});

module.exports = router;


// TODO: Create centalized error handler.