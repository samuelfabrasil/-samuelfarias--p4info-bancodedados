
exports.up = function(knex, Promise) {
    return knex.schema.createTable('TB_ALUNO_DISCIPLINA', function(t) {
        t.int('periodo').notNull();
        t.float('nota').notNull();
        t.integer('id_al').unsigned()
        t.integer('id_di').unsigned()
        t.foreign('id_al').references('TB_ALUNO.id')
        t.foreign('id_di').references('TB_DISCIPLINA.id')
        t.primary(['id_al', 'id_di'])
    }).then(function () {
        return knex('TB_ALUNO_DISCIPLINA').insert([
              {id_al:1, id_di:1, nota:10, periodo:4},
              {id_al:1, id_di:2, nota:10, periodo:4},
              {id_al:1, id_di:3, nota:10, periodo:4},
              {id_al:1, id_di:4, nota:10, periodo:4},
        ])
    })
};

exports.down = function(knex, Promise) {
    console.log("gello nata");
    return knex.schema.dropTable('TB_ALUNO');
};