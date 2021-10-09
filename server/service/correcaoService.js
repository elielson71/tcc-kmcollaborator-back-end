// camada responsavel pelas regras de negocio
const correcaoData = require('../data/correcaoData.js');
const itensCorrecao = require('../data/itensCorrecaoData.js');

exports.getCorrecao = () => correcaoData.getCorrecao();
exports.getOneCorrecao = async (id_correcao) => {
    const resp = await correcaoData.getOneCorrecao(id_correcao)
    if (!resp) throw new Error('Correcao não Encontrado')
    return resp
}
exports.getCorrecaoItensQuestions = async (id_correcao) => {
    return await correcaoData.getCorrecaoItensQuestions(id_correcao)
}
exports.getRespostaCorrecao = async (correcao) => {
    return await correcaoData.getRespostaCorrecao(correcao)
}
exports.saveCorrecao = async function (correcao) {
    const newcorrecao = await correcaoData.saveCorrecao(correcao);
    return correcao.itens_correcao.map(async item => {
        item['id_correcao']=newcorrecao.id_correcao
        await itensCorrecao.saveItensCorrecao(item)
    })
}


exports.putCorrecao = async function (id_correcao, correcao) {
    await correcaoData.putCorrecao(id_correcao, correcao);
    correcao.itens_correcao.map(async item => {
        item['id_correcao']=id_correcao
        await itensCorrecao.updateItensCorrecao(item)
    })
}

exports.deletCorrecao = async function (id) {
    return correcaoData.deleteCorrecao(id)
};


