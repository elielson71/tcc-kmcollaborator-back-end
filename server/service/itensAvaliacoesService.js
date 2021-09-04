
const answerData = require('../data/answerData')
const ItensAvaliacoesData = require('../data/itensAvaliacoesData')


exports.saveItensAvaliacoes = async function (itensAvaliacoes) {
    let resp = []
    if (itensAvaliacoes)
        Object.values(itensAvaliacoes).forEach(async function (value, key) {
            let itensAvaliacoes = {}
            itensAvaliacoes['id_avaliacoes'] = value.id_avaliacoes
            itensAvaliacoes['nota_pergunta'] = value.nota_pergunta
            itensAvaliacoes['id_perguntas'] = value.id_perguntas
            itensAvaliacoes['situacao'] = value.situacao
            if(await ItensAvaliacoesData.getItensAvaliacoesPerguntas(value.id_avaliacoes,value.id_perguntas))
                resp = await ItensAvaliacoesData.updateItensAvaliacoes(itensAvaliacoes);
            else
                resp = await ItensAvaliacoesData.saveItensAvaliacoes(itensAvaliacoes);
        })
    return resp;

}
exports.deletAnswer = async function (id) {
    return answerData.deleteAnswer(id)
};