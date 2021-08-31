require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

// ℹ️ Connects to the database
const connectDB = require('./db/db');
connectDB();

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

require('./configs/session.config')(app);

// default value for title local
app.locals.title = 'Plant Nerd - An Ironhack Project';

app.locals.moment = require('moment');

const {isLoggedIn} = require('./routes/guards/guards');
app.use((req, res, next) => {
  const result = isLoggedIn(req);
  app.locals.isLoggedIn = result;
  next();
});

const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth);

const plants = require('./routes/plants');
app.use('/', plants);
const profile = require('./routes/profile');
app.use('/', profile);

module.exports = app;
