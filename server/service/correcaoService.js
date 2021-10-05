// camada responsavel pelas regras de negocio
const correcaoData = require('../data/correcaoData.js')

exports.getCorrecao = () => correcaoData.getCorrecao();
exports.getOneCorrecao = async (id_correcao) => {
    const resp = await correcaoData.getOneCorrecao(id_correcao)
    if (!resp) throw new Error('Correcao não Encontrado')
    return resp
}

exports.saveCorrecao = async function (correcao) {
    //correcaoAutomatica(correcao)
    return correcao.map(async item => {
        const newCorrecao = await correcaoData.saveCorrecao(item);
        const nota_parcial = correcaoAutomatica(newCorrecao)
        return nota_parcial
    })
}


exports.putCorrecao = async function (id_correcao, correcao) {
    await correcaoData.putCorrecao(id_correcao, correcao);
    return 'ok'
}

exports.deletCorrecao = async function (id) {
    return correcaoData.deleteCorrecao(id)
};

async function correcaoAutomatica(correcao) {
    //const itensCorrigir = correcao.filter(item => item.id_resposta)

    const gabarito = await correcaoData.getGabarito(correcao.id_avaliacao)
    gabarito.map(async item=>{
        await correcaoData.putCorrecao(item.id_correcao,{'id_correcao':item.id_correcao,'nota':item.nota_pergunta,'situacao':'C'})
    })
    return await correcaoData.getNotaParcial(correcao.id_avaliacao,correcao.id_profissional)
    // consulta todas as atividade que tem id resposta e que correta S e com nota da questão
    //pegar primeiro id da correcao 
    //verifico de id_resposta está objeto da consulta
    //if tiver coloca nota questão
    //else tiver coloca zero na nota da correcao 
}
