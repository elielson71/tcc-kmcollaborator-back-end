// camada responsavel por se comunicar com banco
const database = require('../infra/database')

exports.getCorrecao = function () {
    return database.query('select id_correcao,id_perguntas,id_profissional,id_resposta,id_avaliacao,nota,situacao,data_correcao,resposta from correcao ') // where=status='C'
}

exports.getOneCorrecao = function (id_correcao) {
    return database.query(`select id_correcao,id_perguntas,id_profissional,id_resposta,id_avaliacao,nota,situacao,data_correcao,resposta from correcao where id_correcao=${id_correcao}`)
}
exports.getNotaParcial = function (id_avaliacao,id_profissional) {
    return database.query(`
    SELECT 
sum(public.correcao.nota) as nota_parcial
FROM
  public.avaliacoes
  INNER JOIN public.correcao ON (public.avaliacoes.id_avaliacoes = public.correcao.id_avaliacao)
  where 
    public.avaliacoes.id_avaliacoes=${id_avaliacao}
  public.correcao.id_profissional=${id_profissional}
  group by
    public.avaliacoes.id_avaliacoes,
  public.correcao.id_profissional
    `)
}
exports.getGabarito = function (id_avaliacao) {
    return database.query(`
    SELECT 
        public.avaliacoes.id_avaliacoes,
        public.correcao.id_resposta,
        public.itens_avaliacoes.nota_pergunta,
        public.correcao.id_correcao
    FROM
    public.avaliacoes
        INNER JOIN public.correcao ON (public.avaliacoes.id_avaliacoes = public.correcao.id_avaliacao)
        INNER JOIN public.respostas ON (public.correcao.id_resposta = public.respostas.id_respostas)
        INNER JOIN public.itens_avaliacoes ON (public.avaliacoes.id_avaliacoes = public.itens_avaliacoes.id_avaliacoes)
        AND (public.itens_avaliacoes.id_perguntas = public.correcao.id_perguntas)
        AND (public.itens_avaliacoes.id_perguntas = public.respostas.id_perguntas)
    WHERE
    avaliacoes.id_avaliacoes=${id_avaliacao} and  respostas.correta = 'S'`)
}

exports.saveCorrecao = function (correcao) {
    const data_cadastro = new Date();
    return database.one(`INSERT INTO correcao (id_perguntas,
        id_profissional,id_resposta,id_avaliacao,nota,situacao,resposta,data_correcao)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning *`,
        [correcao.id_perguntas, correcao.id_profissional, correcao.id_resposta,
        correcao.id_avaliacao, correcao.nota, correcao.situacao, correcao.resposta,
            data_cadastro])
}
exports.putCorrecao = function (id, correcao) {
    return database.none(`UPDATE correcao SET id_correcao=${correcao.id_correcao},
    id_perguntas=${correcao.id_perguntas},id_profissional=${correcao.id_profissional},
    id_resposta=${correcao.id_resposta},id_avaliacao=${correcao.id_avaliacao},
    nota=${correcao.nota},situacao=${correcao.situacao},resposta=${correcao.resposta}
     where id_correcao=${id}`)
}

exports.deleteCorrecao = async function (id) {
    try {
        await database.none('DELETE FROM correcao WHERE id_correcao=$1', [id]);
        return { status: 1, message: 'correcao deletado com sucesso!' }
    } catch (e) {

        return { stutus: 2, mensage: ' error:' + e.detail }
    }
}
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
