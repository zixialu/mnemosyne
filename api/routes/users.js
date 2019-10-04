const createError = require('http-errors');
const express = require('express');

const UserService = require('../services/UserService');

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
      console.error(err);
      return next(err);
    }
  });

  router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const userRecord = await User.findOne(username);
    if (!userRecord) {
      // TODO: Handle failed login
    }
    const verified = await User.verify(userRecord.id, password);
    if (!verified) {
      // TODO: Handle failed login
    }

    return {
      username: userRecord.username,
      email: userRecord.email,
      token: User.generateJWT(userRecord),
    };
  });

  return router;
};
