module.exports = knex => ({
  async create({ username, email, password }) {
    // TODO: Hash password
    const passwordHash = password;

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

  async changePassword({ id, password }) {
    // TODO: Hash password
    const passwordHash = password;

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
