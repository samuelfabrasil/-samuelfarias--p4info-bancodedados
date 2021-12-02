
exports.up = function(knex, Promise) {
    return knex.schema.createTable('TB_DISCIPLINA', function(t) {
        console.log("gello natas");
        t.increments('id').primary()
        t.string('nome').notNull();
    }).then(function () {
        return knex('TB_DISCIPLINA').insert([
              {nome:'Banco de dados'},
              {nome:'Redes de computadores'},
              {nome:'Algoritmos'},
              {nome:'Programacao orientada a objeto'}
        ])
    })
};
exports.down = function(knex, Promise) {
    console.log("gello nata");
    return knex.schema.dropTable('TB_DISCIPLINA');
};