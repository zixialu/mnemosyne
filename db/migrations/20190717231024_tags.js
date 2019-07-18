
exports.up = function (knex) {
  return knex.schema.createTable('tags', (table) => {
    table
      .increments('userId');
    table
      .string('name')
      .notNullable();
    table
      .integer('parent')
      .unsigned()
      .references('userId')
      .inTable('tags')
      .onDelete('cascade');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('tags');
};
