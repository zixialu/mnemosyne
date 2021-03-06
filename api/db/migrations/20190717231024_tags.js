
exports.up = knex => knex.schema.dropTableIfExists('tags')
  .then(() => (
    knex.schema.createTable('tags', (table) => {
      table.increments('id');

      table.string('name')
        .notNullable();

      table.integer('parent_id')
        .unsigned();

      table.foreign('parent_id')
        .references('tags.id');

      table.timestamps(true, true);
    })
  ));

exports.down = knex => knex.schema.dropTable('tags');
