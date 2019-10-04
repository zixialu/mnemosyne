const UserService = require('../../services/UserService');

module.exports = (knex) => {
  const User = UserService(knex);

  return {
    async getUserFromJWT(req, res, next) {
      const { jwt } = req;
      const userRecord = await User.get(jwt.id);
      if (!userRecord) {
        return res.status(401).end('User not found');
      }

      req.user = userRecord;
      return next();
    },
  };
};
