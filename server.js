const Koa = require('koa');
const knex = require('knex');
const knexConfig = require('./knexfile');
require('dotenv').config();

const app = module.exports = new Koa();

// Set up knex
const { DB_ENV: dbEnv } = process.env;
const pg = knex(knexConfig[dbEnv]);

app.listen(process.env.PORT || 3000);
