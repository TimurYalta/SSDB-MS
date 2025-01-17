// if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
// }

const express = require('express');
const bodyParser = require('body-parser');
const boardsRoutes = require('./routes/boardsRoutes');
const domainRoutes = require('./routes/domainRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/policyRoutes');
const cors = require('cors');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const initPassport = require('./utils/passport-config');
const passport = require('passport');
const authServices = require('./services/authDBService');
const authVerify = require('./utils/authVerification');

initPassport(passport, authServices.getUserByUserName, authServices.getUserByID);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));
////// sETTINGS
app.use('public', express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////PASSPORT
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

//////ROUTES
app.post('/login', authVerify.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.use(authRoutes);
app.use('/boards', authVerify.checkAuthenticated, boardsRoutes);
app.use('/domains', authVerify.checkAuthenticated, domainRoutes);
app.use('/users', authVerify.checkAuthenticated, userRoutes);
app.use('/policies', authVerify.checkAuthenticated, policyRoutes);

app.get('/', function (req, res, next) {
    res.redirect('/domains/all');
});
app.use(authVerify.checkAuthenticated, function (req, res, next) {
    console.log(req.url);
    // console.log('/domains/policy/download/'+req.params.id)
    // console.log(JSON.stringify(req))
    res.status(404);
    res.send("NOT FOUND");
});




app.listen(3000);




