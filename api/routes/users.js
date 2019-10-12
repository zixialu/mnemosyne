const createError = require('http-errors');
const express = require('express');
const UserService = require('../services/UserService');
const SessionService = require('../services/SessionService');

const router = express.Router();

module.exports = (knex) => {
  const User = UserService(knex);

  // POST /users
  // Create new user
  router.post('/', async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const createdUser = await User.create({ username, email, password });
      return res.json(createdUser);
    } catch (err) {
      return next(err);
    }
  });

  router.post('/login', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const verifiedUser = await User.verify(username, password);
      if (verifiedUser) {
        SessionService.addUserToSession();
        return res.sendStatus(200);
      }
      return res.sendStatus(401);
    } catch (err) {
      return next(err);
    }
  });

  // GET /users/:userId
  // Get user by id
  router.get('/:userId', (req, res) => res.json(req.user));

  return router;
};
