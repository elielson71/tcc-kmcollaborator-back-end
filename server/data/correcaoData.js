// camada responsavel por se comunicar com banco
const database = require('../infra/database')

exports.getCorrecao = function () {
    return database.query('select id_correcao,id_perguntas,id_profissional,id_resposta,id_avaliacao,nota,situacao,data_correcao,resposta from correcao ') // where=status='C'
}

exports.getOneCorrecao = function (id_correcao) {
    return database.query(`select id_correcao,id_perguntas,id_profissional,id_resposta,id_avaliacao,nota,situacao,data_correcao,resposta from correcao where id_correcao=${id_correcao}`)
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
