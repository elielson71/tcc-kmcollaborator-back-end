// camada responsavel pelas regras de negocio
const questionsData = require('../data/questions_data')
const answerData = require('../data/answer_data')
const linksData = require('../data/links_data')


exports.getQuestions = () => questionsData.getQuestion();
exports.getOneQuestion = async (id_perguntas) => {
    return await questionsData.getOneQuestion(id_perguntas)
}
exports.getQuestionAnswer = async (id_perguntas) => {
    return await answerData.getAnswer(id_perguntas)
}
exports.getQuestionLinks = async (id_perguntas) => {
    return await linksData.getLinks(id_perguntas)
}
exports.saveQuestion = async function (question) {
    const newquestion = await questionsData.saveQuestion(question);
    if (newquestion && question.answers) {
        Object.values(question.answers).forEach(async function (value, key) {
            let answser = {}
            answser['descricao'] = value.descricao
            answser['id_perguntas'] = newquestion.id_perguntas
            answser['correta'] = (value.correta === undefined ? 'N' : value.correta)
            await answerData.saveAnswer(answser);
        })
    }

    if (newquestion && question.link) {
        Object.values(question.link).forEach(async function (value) {
            let midias = {}
            midias['dados'] = value.dados
            midias['id_midia'] = value.id_midias
            midias['id_perguntas'] = newquestion.id_perguntas
            await linksData.saveLinks(midias)
        })
    }


    return newquestion;

}

exports.putQuestion = async function (id_perguntas, question) {
    await questionsData.putQuestion(id_perguntas, question);
    if (question.answers)
        Object.values(question.answers).forEach(async function (value) {
            let answser = {}
            answser['descricao'] = value.descricao
            answser['id_perguntas'] = id_perguntas
            answser['correta'] = (value.correta === undefined ? 'N' : value.correta)
            await questionsData.putQuestionAnswer(value.id_respostas, answser);
        })
    if (question.link) {
        Object.values(question.link).forEach(async function (value) {
            let midias = {}
            midias['dados'] = value.dados
            midias['id_midia'] = value.id_midias
            midias['id_perguntas'] = id_perguntas

            const link = await linksData.getOneLinks(value.id_links)
            if(link.length===0){
                await linksData.saveLinks(midias)
            }else{
                await questionsData.putQuestionLinks(value.id_links,midias)
            }
        })
    }

    return 'ok';
}


exports.deletQuestion = async function (id) {
    await linksData.deleteLinks(id)
    await answerData.deleteAnswer(id)
    return questionsData.deleteQuestion(id)
};

