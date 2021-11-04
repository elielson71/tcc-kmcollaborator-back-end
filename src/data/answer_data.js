const database = require('../infra/database')
exports.getAnswer = function(id_perguntas){
   return database.query(`select * from respostas where id_perguntas=${id_perguntas}`)
}
exports.getAnswer = function(id_perguntas){
   return database.query(`select * from respostas where id_perguntas=${id_perguntas}`)
}
exports.deleteAnswer = function(id){
   return database.none('DELETE FROM respostas WHERE id_respostas=$1',[id]);
}
exports.saveAnswer = function (answer){
   return database.one('INSERT INTO respostas (id_perguntas, descricao, correta) VALUES($1,$2,$3) returning *',
   [answer.id_perguntas,answer.descricao,answer.correta])
}