const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRY } = process.env;

module.exports = knex => ({
  async create({ username, email, password }) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    return knex('users')
      .insert({
        username,
        email,
        password_hash: passwordHash,
      });
  },

  async get(id) {
    return knex('users')
      .select('id', 'username', 'email')
      .where({ id })
      .first();
  },

  async findOne(username) {
    return knex('users')
      .select('id', 'username', 'email')
      .where({ username })
      .first();
  },

  async verify(id, password) {
    const recordedHash = await knex('users')
      .select('password_hash')
      .where({ id });

    return bcrypt.compare(password, recordedHash);
  },

  async changePassword({ id, password }) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    return knex('users')
      .where({ id })
      .update({ password_hash: passwordHash });
  },

  async changeEmail({ id, email }) {
    return knex('users')
      .where({ id })
      .update({ email });
  },

  async destroy(id) {
    return knex('users')
      .where({ id })
      .del();
  },

  generateJWT(user) {
    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return jwt.sign(data, JWT_SECRET, JWT_EXPIRY);
  },
});
