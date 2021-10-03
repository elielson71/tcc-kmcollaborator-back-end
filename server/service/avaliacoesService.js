// camada responsavel pelas regras de negocio
const avaliacoesData = require('../data/avaliacoesData.js')
const itensAvaliacoesData = require('../data/itensAvaliacoesData')


exports.getAvaliacoes = () => avaliacoesData.getAvaliacoes();
exports.getOneAvaliacoes = async (id_perguntas) => {
    return await avaliacoesData.getOneAvaliacoes(id_perguntas)
}
exports.getAvaliacoesItenQuestions = async (id_perguntas) => {
    return await avaliacoesData.getAvaliacoesItenQuestions(id_perguntas)
}
exports.getAvaliacoesQuestions = async (id_perguntas) => {
     const resp = {}
    const avaliacao = await avaliacoesData.getOneAvaliacoes(id_perguntas)
    const questions = await avaliacoesData.getAvaliacoesQuestions(id_perguntas)
    resp['avaliacao'] = avaliacao
    resp['questions'] = questions
    return resp
}


exports.saveAvaliacoes = async function (avaliacoes) {
    
    const newAvaliacoes = await avaliacoesData.saveAvaliacoes(avaliacoes);
    if (newAvaliacoes && avaliacoes.itensAvaliacao) {
        Object.values(avaliacoes.itensAvaliacao).forEach(async function (value, key) {
            let itens = {}
            itens['id_avaliacoes'] = newAvaliacoes.id_avaliacoes
            itens['nota_pergunta'] = value.nota_pergunta
            itens['id_perguntas'] = value.id_perguntas
            itens['situacao'] = 'AB'
            await itensAvaliacoesData.saveItensAvaliacoes(itens);
        })
    }

    return newAvaliacoes;

}

exports.putAvaliacoes = async function (id_perguntas, avaliacoes) {
    await avaliacoesData.putAvaliacoes(id_perguntas, avaliacoes);
    
        Object.values(avaliacoes.itensAvaliacao).forEach(async function (value) {
            let itens = {}
            itens['id_avaliacoes'] = value.id_avaliacoes
            itens['nota_pergunta'] = value.nota_pergunta
            itens['id_perguntas'] = value.id_perguntas
            itens['situacao'] = value.situacao
            
            await avaliacoesData.putAvaliacoesitensAvaliacoes(itens);
        })

    return 'ok';
}


exports.deletAvaliacoes = async function (id) {
    return avaliacoesData.deleteAvaliacoes(id)
};

