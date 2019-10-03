const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = process.env;

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
      .where({ id });
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
});
