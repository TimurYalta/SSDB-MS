const express = require('express');
const router = express.Router();
const path = require('path');
const domainServices = require('../services/domainsDBService');
const boardsServices = require('../services/boardsDBService');


router.get('/all', async (req, res, next) => {
    try {
        let domains = await domainServices.getAllDomains();
        if(req.user.rights ==1){
            // const allowedDomains = domainServices.get
        }
        res.render('domains/domains', { page: 'Domains', menuId: 'home', title: 'SSDB | Domains', domains });

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
        const domainDevices = await domainServices.getDevicesByID(req.params.id);
        // const currentDomainDeviceList = await domainServices.getDevicesByID(req.params.id);
        const allDeviceList = await boardsServices.getAllBoards();// name: "213", id: 1 }, { name: "213fsa", id: 2 }, { name: "4", id: 3 }];
        console.log(allDeviceList);
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
        res.render('domains/domainInfo', {
            page: 'Domains',
            menuId: 'home',
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

router.get('/policy/add/:id', async (req, res, next) => {
    // res.render();
    const name = await domainServices.getNameByID(req.params.id);
    const policiesList = await domainServices.getPolicies(req.params.id);
    res.render('domains/domainPolicyAdd',
        {
            page: 'Create Domain Policy',
            menuId: 'home',
            title: 'SSDB | Define policy',
            id: req.params.id,
            name,
            policies: policiesList
        });

});

router.get('/policy/download/:id', async (req, res, next) => {
    try {
        const name = await domainServices.getPolicyByID(req.params.id);
        const filePath = path.resolve(__dirname, '..','..', 'plugins', req.params.id);
        console.log(name);
        res.download(filePath, name[0].policy_name+'.py');
    } catch (error) {
        console.log(error);
        throw error;
    }
});


router.post('/policy/add/:id', async (req, res, next) => {
    // res.render();
    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.file;
    // const fileID = uuid();
    const name = req.body.name;
    await domainServices.addPolicy(req.params.id, name, file);
    // res.send(name);
    const policiesList = await domainServices.getPolicies(req.params.id);
    res.render('domains/domainPolicyAdd',
        {
            page: 'Create Domain Policy',
            menuId: 'home',
            title: 'SSDB | Define policy',
            id: req.params.id,
            name,
            policy:policiesList
        });

});


module.exports = router;


// TODO: Create centalized error handler.