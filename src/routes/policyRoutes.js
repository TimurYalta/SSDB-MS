const express = require('express');
const router = express.Router();
const path = require('path');
const domainServices = require('../services/domainsDBService');
const boardsServices = require('../services/boardsDBService');
const policyServices = require('../services/policyDBService');

router.get('/all', async (req, res, next) => {
    try {
        const policies = await policyServices.getAllPolicies();
        // console.log(domains);
        res.render('policies/policies', { page: 'Policies', menuId: 'home', title: 'SSDB | Extreme policies', policies });
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


router.post('/create', async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const name = req.body.name;
    await policyServices.addPolicy(name, file);

    const policies = await policyServices.getAllPolicies();
    res.render('policies/policies', { page: 'Policies', menuId: 'home', title: 'SSDB | Extreme policies', policies });
});


router.get('/download/:id', async (req, res, next) => {
    try {
        const policy = await policyServices.getPolicyByID(req.params.id);
        const filePath = path.resolve(__dirname, '..','..', 'plugins', req.params.id);
        res.download(filePath, policy.name+'.py');
    } catch (error) {
        console.log(error);
        throw error;
    }
});


module.exports = router;
