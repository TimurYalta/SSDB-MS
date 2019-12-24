const express = require('express');
const bodyParser = require('body-parser');
const boardsRoutes = require('./routes/boardsRoutes');
const domainRoutes = require('./routes/domainRoutes');
const cors = require('cors');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/boards', boardsRoutes);
app.use('/domains', domainRoutes)

app.listen(3000);




