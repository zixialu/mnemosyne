const Koa = require('koa');
const knex = require('knex');
require('dotenv').config();

const app = module.exports = new Koa();

const pg = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  // searchPath: ['knex', 'public'],
});

app.listen(process.env.PORT || 3000);
