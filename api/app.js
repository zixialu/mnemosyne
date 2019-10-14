const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const KnexSessionStore = require('connect-session-knex')(session);
const path = require('path');
const logger = require('morgan');

require('dotenv').config({ path: '../.env' });

const knex = require('knex');
const knexConfig = require('./knexfile');

const sessionMiddleware = require('./middleware/session');

// Set up knex
const { ENV, SESSION_SECRET, CLIENT_URL } = process.env;
const pg = knex(knexConfig[ENV]);

// Session store
const store = new KnexSessionStore({
  knex: pg,
  tablename: 'sessions',
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
app.use(cors({
  origin: CLIENT_URL,
  optionsSuccessStatus: 200,
}));
app.use(session({
  cookie: {
    maxAge: 2629800000, // 1 Month
    // In order for { sameSite: false, secure: false } to work for development,
    // The chrome flag 'Cookies without SameSite must be secure' must be disabled
    // chrome://flags/#cookies-without-same-site-must-be-secure
    sameSite: ENV === 'production' || 'none',
    secure: ENV === 'production',
  },
  name: 'sid',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  store,
}));
// FIXME: Figure out how to disable strict samesite for development
// Is this relevant? https://www.chromestatus.com/feature/5633521622188032
app.use(sessionMiddleware.setSameSessionNone);
app.use(sessionMiddleware.clearInvalidSession);

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
