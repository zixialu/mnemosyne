
exports.up = function (knex) {
  return knex.schema.createTable('tags', (table) => {
    table.increments('user_id');

    table.string('name')
      .notNullable();

    table.integer('parent')
      .unsigned()
      .references('user_id')
      .inTable('tags')
      .onDelete('cascade');

    table.timestamps(true, true);
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('tags');
};
