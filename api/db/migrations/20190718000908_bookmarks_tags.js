
exports.up = knex => knex.schema.dropTableIfExists('bookmarks_tags')
  .then(() => (
    knex.schema.createTable('bookmarks_tags', (table) => {
      table.increments('id');

      table.integer('bookmark_id')
        .unsigned()
        .notNullable();

      table.foreign('bookmark_id')
        .references('bookmarks.id');

      table.integer('tag_id')
        .unsigned()
        .notNullable();

      table.foreign('tag_id')
        .references('tags.id');

      table.timestamps(true, true);
    })
  ));

exports.down = knex => knex.schema.dropTable('bookmarks_tags');
