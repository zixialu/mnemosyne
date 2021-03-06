const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config({ path: '../.env' });

const knex = require('knex');
const knexConfig = require('./knexfile');

// Set up knex
const { DB_ENV: dbEnv } = process.env;
const pg = knex(knexConfig[dbEnv]);

const indexRouter = require('./routes/index');
const bookmarksRouter = require('./routes/bookmarks')(pg);
const tagsRouter = require('./routes/tags')(pg);
const usersRouter = require('./routes/users')(pg);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bookmarks', bookmarksRouter);
app.use('/tags', tagsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// error-handling middleware always takes 4 args to identify as error handlers
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Clean the error for production
  const { message } = err;
  const error = req.app.get('env') === 'development' ? err : { message };

  // Return the error
  res.status(err.status || 500)
    .json(error);
});

module.exports = app;
