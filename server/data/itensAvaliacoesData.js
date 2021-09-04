const database = require('../infra/database')
exports.getItensAvaliacoes = function (id_avaliacoes) {
   return database.query(`select * from itens_avaliacoes where id_avaliacoes=${id_avaliacoes}`)
}
exports.getItensAvaliacoesPerguntas = function (id_avaliacoes, id_perguntas) {
   return database.query(`select * from itens_avaliacoes where id_avaliacoes=${id_avaliacoes} and id_perguntas=${id_perguntas}`)
}

exports.saveItensAvaliacoes = function (ItensAvaliacoes) {
   
   return database.one('INSERT INTO itens_avaliacoes (id_avaliacoes,nota_pergunta,id_perguntas,situacao) VALUES($1,$2,$3,$4) returning *',
      [ItensAvaliacoes.id_avaliacoes, ItensAvaliacoes.nota_pergunta, ItensAvaliacoes.id_perguntas,ItensAvaliacoes.situacao])
}

exports.updateItensAvaliacoes = function (ItensAvaliacoes) {
   if (ItensAvaliacoes === {})
      return
      
   return database.none(`UPDATE itens_avaliacoes SET nota_pergunta=
   ${ItensAvaliacoes.nota_pergunta}, situacao='${ItensAvaliacoes.situacao}'` )
}

exports.deleteItensAvaliacoes = function (id) {
   return database.none('DELETE FROM itens_avaliacoes WHERE id_avaliacoes=$1', [id]);
}