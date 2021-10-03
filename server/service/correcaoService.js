// camada responsavel pelas regras de negocio
const correcaoData = require('../data/correcaoData.js')

exports.getCorrecao = () => correcaoData.getCorrecao();
exports.getOneCorrecao = async (id_correcao) => {
    const resp = await correcaoData.getOneCorrecao(id_correcao)
    if (!resp) throw new Error('Correcao não Encontrado')
    return resp
}

exports.saveCorrecao = async function (correcao) {
    return correcao.map(async item => {
        const newCorrecao = await correcaoData.saveCorrecao(item);
        return newCorrecao
    })
}


exports.putCorrecao = async function (id_correcao, correcao) {
    await correcaoData.putCorrecao(id_correcao, correcao);
    return 'ok'
}

exports.deletCorrecao = async function (id) {
    return correcaoData.deleteCorrecao(id)
};

function correcaoAutomatica(correcao) {

}