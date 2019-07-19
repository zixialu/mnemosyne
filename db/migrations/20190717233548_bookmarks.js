
exports.up = knex => knex.schema.dropTableIfExists('bookmarks')
  .then(() => (
    knex.schema.createTable('bookmarks', (table) => {
      table.increments('id');

      table.string('name')
        .notNullable();

      table.string('uri')
        .notNullable();

      table.text('description');

      table.timestamps(true, true);
    })
  ));

exports.down = knex => knex.schema.dropTable('bookmarks');
