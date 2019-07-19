
exports.up = knex => knex.schema.dropTableIfExists('users')
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
  ));

exports.down = knex => knex.schema.dropTable('users');
