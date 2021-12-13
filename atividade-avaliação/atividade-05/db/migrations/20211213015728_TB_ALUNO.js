
exports.up = function(knex, Promise) {
    return knex.schema.createTable('TB_ALUNO', function(t) {
        t.increments('id').primary().notNull();
        t.string('nome').notNull();
    }).then(function () {
        return knex('TB_ALUNO').insert([
              {nome:'Samuel Farias'},
              {nome:'Vinicius Viajante'},
              {nome:'Caio de Belem'},
              {nome:'Gabriel Pensador'}
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('TB_ALUNO');
};