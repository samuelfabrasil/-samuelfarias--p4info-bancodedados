
exports.up = function(knex, Promise) {
    return knex.schema.createTable('TB_ALUNO', function(t) {
        console.log("gello natas");
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
    console.log("gello nata");
    return knex.schema.dropTable('TB_ALUNO');
};