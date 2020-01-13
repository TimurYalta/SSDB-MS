function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        if (req.url != '/login') {
            res.redirect('/login');
        }
        else {
            next();
        }
    }
}

function checkNotAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        if (req.url == '/login') {
            res.redirect('/');
        }
        else{
            next();
        }
    }
    else {
        if (req.url != '/login') {
            res.redirect('/login');
        }
        else{
            next();
        }
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
};