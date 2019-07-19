
exports.up = function (knex) {
  return knex.schema.createTable('bookmarks', (table) => {
    table.increments('id');

    table.string('name')
      .notNullable();

    table.string('uri')
      .notNullable();

    table.text('description');

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('bookmarks');
};
