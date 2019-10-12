const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const path = require('path');
const logger = require('morgan');


require('dotenv').config({ path: '../.env' });

const knex = require('knex');
const knexConfig = require('./knexfile');

// Set up knex
const { DB_ENV, SESSION_SECRET } = process.env;
const pg = knex(knexConfig[DB_ENV]);

// Knex session store
const store = new KnexSessionStore({
  knex: pg,
  tablename: 'sessions', // optional. Defaults to 'sessions'
  createTable: true,
});

const indexRouter = require('./routes/index');
const bookmarksRouter = require('./routes/bookmarks')(pg);
const tagsRouter = require('./routes/tags')(pg);
const usersRouter = require('./routes/users')(pg);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookie: {
    maxAge: 2629800000, // 1 Month
    sameSite: true,
    secure: true,
  },
  name: 'sid',
  rolling: true,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  store,
}));

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
  console.error(err);

  // Clean the error for production
  const { message } = err;
  const error = req.app.get('env') === 'development' ? err : { message };

  // Return the error
  res.status(err.status || 500)
    .json(error);
});

module.exports = app;
