
exports.up = function(knex) {
  return knex.schema.createTable('critics',(table)=>{
      table.increments('critic_id').primary()
      table.string('preferred_name')
      table.string('surname')
      table.string('oragnization_name')
      table.timestamps([useTimestamps], [defaultToNow])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('critics')
};
