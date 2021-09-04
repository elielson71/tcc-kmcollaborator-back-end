// camada responsavel por se comunicar com banco
const database = require('../infra/database')

exports.getQuestion = function(){
    return database.query('select id_perguntas, conteudo, id_responsavel,id_departamento, nivel from perguntas ') // where=status='C'
}
exports.getOneQuestion = function(id_perguntas){
    return database.query(`select id_perguntas, conteudo,tipo_resposta, id_responsavel,senioridade,id_departamento, nivel from perguntas where id_perguntas=${id_perguntas}`)
}
exports.saveQuestion = function (question){
    return database.one('INSERT INTO perguntas (conteudo,tipo_resposta,id_responsavel,senioridade,id_departamento,nivel) VALUES($1,$2,$3,$4,$5,$6) returning *',
    [question.conteudo,question.tipo_resposta,question.id_responsavel,question.senioridade,question.id_departamento,question.nivel])
}
exports.putQuestion = function (id,question){
    return database.none('UPDATE perguntas SET conteudo=$1, tipo_resposta=$2, id_responsavel=$3,senioridade=$4, id_departamento=$5, nivel=$6 where id_perguntas=$7',
    [question.conteudo,question.tipo_resposta,question.id_responsavel,question.senioridade,question.id_departamento,question.nivel,id])
}
exports.putQuestionAnswer = function (id_resposta,answer){
    return database.none('UPDATE respostas SET id_perguntas=$1, descricao=$2, correta=$3 where id_respostas=$4',
    [answer.id_perguntas,answer.descricao,answer.correta,id_resposta])
}
 exports.deleteQuestion = async function(id){
    await database.none('DELETE FROM respostas WHERE id_perguntas=$1',[id]);
    return  await database.none('DELETE FROM perguntas WHERE id_perguntas=$1',[id]);
}
