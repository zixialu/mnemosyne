const createError = require('http-errors');
const express = require('express');
const UserService = require('../services/UserService');

const router = express.Router();

module.exports = (knex) => {
  const User = UserService(knex);

  router.param('userId', async (req, res, next, userId) => {
    try {
      const foundUser = await User.get(userId);
      if (foundUser) {
        req.user = foundUser;
        return next();
      }
      return next(createError(404, 'User not found'));
    } catch (err) {
      console.error(err);
      return next(err);
    }
  });

  // POST /users
  router.post('/', async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const createdUser = await User.create({ username, email, password });
      return res.json(createdUser);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  });

  // GET /users/:userId
  router.get('/:userId', (req, res) => res.json(req.user));

  return router;
};
