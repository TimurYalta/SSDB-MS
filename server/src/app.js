const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notesRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/notes', notesRoutes);


app.listen(3000);




