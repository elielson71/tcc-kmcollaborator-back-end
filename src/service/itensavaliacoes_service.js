
const answerData = require('../data/answerdata')
const ItensAvaliacoesData = require('../data/itensavaliacoesdata')


exports.saveItensAvaliacoes = async function (itensAvaliacoes) {
    console.log(itensAvaliacoes)
    let resp = []
    if (itensAvaliacoes)
        Object.values(itensAvaliacoes).forEach(async function (value, key) {
            let itensAvaliacoes = {}
            itensAvaliacoes['id_avaliacoes'] = value.id_avaliacoes
            itensAvaliacoes['nota_pergunta'] = value.nota_pergunta
            itensAvaliacoes['id_perguntas'] = value.id_perguntas
            itensAvaliacoes['situacao'] = value.situacao
            const existeItens = await ItensAvaliacoesData.getItensAvaliacoesPerguntas(value.id_avaliacoes,value.id_perguntas)
            if(existeItens.length!==0){
                resp = await ItensAvaliacoesData.updateItensAvaliacoes(itensAvaliacoes);
            }else{
                resp = await ItensAvaliacoesData.saveItensAvaliacoes(itensAvaliacoes);
            }
        })
    return resp;

}
exports.deletAnswer = async function (id) {
    return answerData.deleteAnswer(id)
};