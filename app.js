const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const { googleProxy } = require('./app/middlewares/googleProxy');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/proxy/', googleProxy);

routes.init(app);

module.exports = app;
