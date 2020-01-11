const express = require('express');
const bodyParser = require('body-parser');
const boardsRoutes = require('./routes/boardsRoutes');
const domainRoutes = require('./routes/domainRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

app.use('public', express.static('public'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRoutes);
app.use('/boards', boardsRoutes);
app.use('/domains', domainRoutes)

app.get('/', function (req, res, next) {
    res.redirect('/domains/all')
});

app.use(function (req, res, next) {
    res.status(404);
    res.send("NOT FOUND");
});




app.listen(3000);




