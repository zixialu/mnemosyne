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
      return next(new Error('failed to load user'));
    } catch (err) {
      return next(err);
    }
  });

  // GET /users/:userId
  router.get('/:userId', (req, res) => {
    res.json(req.user);
  });

  return router;
};
