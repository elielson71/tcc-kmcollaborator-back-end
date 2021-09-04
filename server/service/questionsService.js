// camada responsavel pelas regras de negocio
const questionsData = require('../data/questionsData')
const answerData = require('../data/answerData')


exports.getQuestions = () => questionsData.getQuestion();
exports.getOneQuestion = async (id_perguntas) => {
    return await questionsData.getOneQuestion(id_perguntas)
}
exports.getQuestionAnswer = async (id_perguntas) => {
    return await answerData.getAnswer(id_perguntas)
}
exports.saveQuestion = async function (question) {

    const newquestion = await questionsData.saveQuestion(question);
    if (newquestion && question.answers) {
        Object.values(question.answers).forEach(async function (value, key) {
            let answser = {}
            answser['descricao'] = value.descricao
            answser['id_perguntas'] = newquestion.id_perguntas
            answser['correta'] = (value.correta === undefined ? 'N' : value.correta)
            await answerData.saveQuestionAnswer(answser);
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

    return 'ok';
}


exports.deletQuestion = async function (id) {
    await answerData.deleteAnswer(id)
    return questionsData.deleteQuestion(id)
};

