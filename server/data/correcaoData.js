// camada responsavel por se comunicar com banco
const database = require('../infra/database')

exports.getCorrecao = function () {
    return database.query('select id_correcao,id_profissional,id_avaliacao,situacao,data_correcao from correcao ') // where=status='C'
}

exports.getOneCorrecao = function (id_correcao) {
    return database.query(`select id_correcao,id_profissional,id_avaliacao,situacao,data_correcao from correcao where id_correcao=${id_correcao}`)
}
exports.getCorrecaoItensQuestions = function (id_correcao) {
    return database.query(`SELECT 
    public.itens_correcao.id_correcao,
    public.perguntas.conteudo,
    public.perguntas.id_perguntas,
    public.perguntas.tipo_resposta,
    public.perguntas.status,
    public.perguntas.id_responsavel,
    public.perguntas.senioridade,
    public.perguntas.nivel,
    public.departamento.id_departamento,
    public.departamento.nome AS descricao_depart,
    nota.nota_pergunta
  FROM
    public.itens_correcao
    INNER JOIN public.perguntas ON (public.itens_correcao.id_perguntas = public.perguntas.id_perguntas)
    INNER JOIN public.departamento ON (public.perguntas.id_departamento = public.departamento.id_departamento)
    LEFT OUTER JOIN 
    (
           SELECT vs_nota.id_correcao,
           vs_nota.id_perguntas,
           vs_nota.nota_pergunta
           FROM vs_nota
         ) nota ON public.itens_correcao.id_correcao = nota.id_correcao and nota.id_perguntas=itens_correcao.id_perguntas
WHERE
itens_correcao.id_correcao = ${id_correcao}`)
}
exports.getRespostaCorrecao = function ({id_correcao,id_pergunta}) {
    return database.query(`select id_respostas,id_perguntas,descricao,selecao,correta 
    from vs_resposta_correcao where id_correcao=${id_correcao} and id_perguntas=${id_pergunta}`)
}

exports.saveCorrecao = function (correcao) {
    //    const data_cadastro = new Date();
    return database.one(`
    INSERT INTO correcao (id_profissional,id_avaliacao,situacao)
    VALUES($1,$2,$3) returning *`,
        [correcao.id_profissional,
        correcao.id_avaliacao, correcao.situacao])
}
exports.putCorrecao = function (id, correcao) {
    return database.none(`UPDATE correcao SET
    situacao='${correcao.situacao}'
     where id_correcao=${id}`)
}

exports.deleteCorrecao = async function (id) {
        await database.none('delete from itens_correcao where id_correcao=$1', [id])
        await database.none('DELETE FROM correcao WHERE id_correcao=$1', [id]);
        return { status: 1, message: 'correcao deletado com sucesso!' }

}
//exports.getNota = async function(id_avaliacao,)
/*
,
data_correcao=${correcao.data_correcao},

correcao.id_correcao
correcao.id_perguntas
correcao.id_profissional
correcao.id_resposta
correcao.id_avaliacao
correcao.nota
correcao.situacao
correcao.data_correcao
*/
