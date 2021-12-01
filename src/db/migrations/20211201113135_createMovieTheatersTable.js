
exports.up = function(knex) {
  return knex.schema.createTable('movie_theaters',(table)=>{
      table.integer('movie_id').unsigned().notNullable()
      table
        .foreign('movie_id')
        .references('movie_id')
        .inTable('movies')
        .onDelete('cascade')
      table.integer('theater_id')
      table
        .foreign('theater_id')
        .references('theater_id')
        .inTable('theater')
        .onDelete('cascade')
      table.boolean('is_showing')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('movie_theaters')
};
