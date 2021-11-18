
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db',sqlite3.OPEN_READWRITE, (error) => {
    if (error) console.log(error);
    else console.log("Ele abriu");
});


db.serialize(() => {
    db.run('create table if not exists TB_ALUNO (id integer primary key autoincrement , nome text)', (error) => {
        if (error) console.log(error);
    });
    db.run('create table if not exists TB_ALUNO_DISCIPLINA (periodo integer,nota float,id_al integer,id_di integer, foreign key(id_al) references TB_ALUNO(id),foreign key(id_di) references TB_DISCIPLINA(id),primary key(id_al,id_di))', (error) => {
        if (error) console.log(error);
    });
    db.run('create table if not exists TB_DISCIPLINA (id integer primary key autoincrement , nome text)', (error) => {
        if (error) console.log(error);
    });
    /*db.run('INSERT INTO TB_ALUNO_DISCIPLINA(periodo,nota,id_al,id_di) VALUES (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?)',['4','10.0','1','1','4','10.0','2','2','1','10.0','1','3','3','10.0','3','1'],(error) => {
        if (error) console.log(error);
    });*/
});

let alunos = ['Samuel Farias','Vinicius Viajante','Caio de Belem','Gabriel Pensador']

let alunos_lista = alunos.map((aluno) => '(?)').join(',');
let sql = 'INSERT INTO TB_ALUNO(nome) VALUES ' + alunos_lista;



db.run(sql, alunos, function(err) {
  if (err) {
    return console.error(err.message);
  }
});

let disciplina = ['Banco de dados','Redes de computadores','Algoritmos','Programacao orientada a objeto']

let disciplina_lista = disciplina.map((disciplina) => '(?)').join(',');
sql = 'INSERT INTO TB_DISCIPLINA(nome) VALUES ' + disciplina_lista;



db.run(sql, disciplina, function(err) {
  if (err) {
    return console.error(err.message);
  }
});

let disciplina_alunos = ['4','10.0','1','1','4','10.0','2','2','1','10.0','1','3','3','10.0','3','1']
//periodo integer,nota float,id_al integer,id_di integer,
let x = 1;
function retornar(){
    if(x == 1){
        x++;
        return '(?';
      }else if(x < 4){
          x++;
          return '?';
      }else{
          x=1;
          return '?)';
      }
}
let disciplina_aluno_lista = disciplina_alunos.map((disciplina) => retornar()).join(',');
sql = 'INSERT INTO TB_ALUNO_DISCIPLINA (periodo,nota,id_al,id_di) VALUES ' + disciplina_aluno_lista;

console.log(sql);

db.run(sql, disciplina_alunos, function(err) {
  if (err) {
    return console.error(err.message);
  }
});


db.serialize(() => {
    console.log('TB_ALUNO')
    db.each(`SELECT *
             FROM TB_ALUNO`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.nome);
    });
    console.log('TB_DISCIPLINA')
    db.each(`SELECT *
             FROM TB_DISCIPLINA`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.nome);
    });
    console.log('TB_ALUNO_DISCIPLINA')
    db.each(`SELECT *
             FROM TB_ALUNO_DISCIPLINA`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id_al +" "+ row.id_di + '\t'+ row.nota +" "+ row.periodo);
    });
  });
  

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });