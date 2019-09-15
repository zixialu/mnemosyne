module.exports = knex => ({
  async create({ name, parentId, userId }) {
    return knex('tags')
      .insert({
        name,
        parent_id: parentId,
        user_id: userId,
      });
  },

  async getAll(userId) {
    return knex('tags')
      .select('id', 'name', 'parent_id')
      .where({ user_id: userId });
  },

  async destroy(id) {
    return knex('tags')
      .where({ id })
      .del();
  },
});
