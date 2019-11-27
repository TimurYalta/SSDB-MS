const express = require('express');
const bodyParser = require('body-parser');
const boardsRoutes = require('./routes/boardsRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/boards', boardsRoutes);


app.listen(3000);




