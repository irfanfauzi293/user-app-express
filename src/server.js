require('dotenv').config();

var express = require('express');
var app = express();
var port = process.env.PORT
var bodyParser = require('body-parser');

const usersRouter = require('./routes/Users');
const authenticationsRouter = require('./routes/Authentications');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/authentications', authenticationsRouter);

app.listen(port);
console.log('Restful API server started on: ' + port);