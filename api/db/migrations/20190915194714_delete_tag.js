
exports.up = (knex) => {
  knex.schema.alterTable('tags', (table) => {
    table.foreign('parent_id').onDelete('CASCADE');
  });
};

exports.down = (knex) => {
  knex.schema.alterTable('tags', (table) => {
    table.foreign('parent_id').onDelete('NO ACTION');
  });
};
