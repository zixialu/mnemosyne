
exports.up = function (knex) {
  return knex.schema.createTable('bookmarks_tags', (table) => {
    table.increments('id');

    table.integer('bookmark_id')
      .unsigned();

    table.integer('tag_id')
      .unsigned();

    table.timestamps(true, true);

    table.foreign('bookmark_id')
      .references('bookmarks.id');

    table.foreign('tag_id')
      .references('tags.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('bookmarks_tags');
};
