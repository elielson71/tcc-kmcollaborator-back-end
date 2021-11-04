const database = require('../infra/database')
exports.getItensCorrecao = function (id_correcao) {
   return database.query(`select id_itens_correcao,id_correcao,id_pergutas,id_resposta,nota,resposta from itens_correcao where id_correcao=${id_correcao}`)
}
exports.getItensCorrecaoPerguntas = function (id_correcao, id_perguntas) {
   return database.query(`select id_itens_correcao,id_correcao,id_pergutas,id_resposta,nota,resposta from itens_correcao where id_correcao=${id_correcao} and id_perguntas=${id_perguntas}`)
}

exports.saveItensCorrecao = function (ItensCorrecao) {
   return database.one('INSERT INTO itens_correcao (id_correcao,id_perguntas,id_resposta,nota,resposta) VALUES($1,$2,$3,$4,$5) returning *',
      [ItensCorrecao.id_correcao,ItensCorrecao.id_perguntas,ItensCorrecao.id_resposta,ItensCorrecao.nota,ItensCorrecao.resposta])
}

exports.updateItensCorrecao = function (ItensCorrecao) {
   if (ItensCorrecao.length===0)
      return
      
   return database.none(`UPDATE itens_correcao SET 
nota=${ItensCorrecao.nota}
   where itens_correcao.id_perguntas=${ItensCorrecao.id_perguntas} and id_correcao=${ItensCorrecao.id_correcao}` )
}

exports.deleteItensCorrecao = function (id_correcao) {
   return database.none('DELETE FROM itens_correcao WHERE id_correcao=$1', [id_correcao]);
}
/*id_itens_correcao,id_correcao,id_pergutas,id_resposta,nota,resposta

ItensCorrecao.id_itens_correcao,ItensCorrecao.id_correcao,ItensCorrecao.id_pergutas,ItensCorrecao.id_resposta,ItensCorrecao.nota,ItensCorrecao.resposta,

ItensCorrecao.id_itens_correcaoid_correcao=${ItensCorrecao.id_correcao},id_pergutas=${ItensCorrecao.id_pergutas},id_resposta=${ItensCorrecao.id_resposta},nota=${ItensCorrecao.nota},resposta=${ItensCorrecao.resposta},
*/