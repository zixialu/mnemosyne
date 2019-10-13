const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = process.env;

module.exports = knex => ({
  async create({ username, email, password }) {
    const passwordHash = await bcrypt.hash(password, Number(SALT_ROUNDS));

    const [createdUser] = await knex('users')
      .insert({
        username,
        email,
        password_hash: passwordHash,
      }, ['id', 'username', 'email']);
    return createdUser;
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

  async verify(username, password) {
    const foundUser = await knex('users')
      .select('id', 'username', 'email', 'password_hash')
      .where({ username })
      .first();
    if (!foundUser) return false;
    const recordedHash = foundUser.password_hash;

    const isValid = await bcrypt.compare(password, recordedHash);
    if (isValid) {
      return {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      };
    }
    return false;
  },

  async changePassword({ id, password }) {
    const passwordHash = await bcrypt.hash(password, Number(SALT_ROUNDS));

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
