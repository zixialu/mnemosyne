const UserService = require('../../services/UserService');

module.exports = (knex) => {
  const User = UserService(knex);

  return {
    async getUserFromJWT(req, res, next) {
      const { user } = req;
      const userRecord = await User.get(user.id);

      req.user = userRecord;
      return next();
    },
  };
};
