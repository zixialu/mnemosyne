
exports.up = knex => knex.schema.dropTableIfExists('users')
  // Create users table
  .then(() => (
    knex.schema.createTable('users', (table) => {
      table.increments('id');

      table.string('username')
        .unique()
        .notNullable();

      table.string('email')
        .unique()
        .notNullable();

      table.string('password_hash')
        .notNullable();

      table.timestamps(true, true);
    })
  ))
  // Add user to bookmarks table
  .then(() => (
    knex.schema.alterTable('bookmarks', (table) => {
      table.integer('user_id')
        .unsigned()
        .notNullable();

      table.foreign('user_id')
        .references('users.id');
    })
  ))
  // Add user to tags table
  .then(() => (
    knex.schema.alterTable('tags', (table) => {
      table.integer('user_id')
        .unsigned()
        .notNullable();

      table.foreign('user_id')
        .references('users.id');
    })
  ));

exports.down = knex => knex.schema.dropTable('users');
