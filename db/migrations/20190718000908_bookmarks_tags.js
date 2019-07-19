
exports.up = function (knex) {
  return knex.schema.dropTableIfExists('bookmarks_tags')
    .then(() => (
      knex.schema.createTable('bookmarks_tags', (table) => {
        table.increments('id');

        table.integer('bookmark_id')
          .unsigned();

        table.foreign('bookmark_id')
          .references('bookmarks.id');

        table.integer('tag_id')
          .unsigned();

        table.foreign('tag_id')
          .references('tags.id');

        table.timestamps(true, true);
      })
    ));
};

exports.down = function (knex) {
  return knex.schema.dropTable('bookmarks_tags');
};
