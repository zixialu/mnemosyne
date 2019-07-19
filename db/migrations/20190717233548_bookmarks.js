
exports.up = function (knex) {
  return knex.schema.createTable('bookmarks', (table) => {
    table.increments('bookmark_id');

    table.string('name')
      .notNullable();

    table.string('uri')
      .notNullable();

    table.text('description');

    table.timestamps(true, true);
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('bookmarks');
};
