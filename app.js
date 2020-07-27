const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const errors = require('./app/middlewares/errorsHandler')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

routes.init(app);
app.use(errors.handle);

module.exports = app;
