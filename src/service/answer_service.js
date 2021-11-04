
const answerData = require('../data/answerdata')

exports.saveAnswer = async function (answer) {
    let resp = []
    if (answer)
        Object.values(answer).forEach(async function (value, key) {
            let answser = {}
            answser['descricao'] = value.descricao
            answser['id_perguntas'] = value.id_perguntas
            answser['correta'] = (value.correta === undefined ? 'N' : value.correta)
            resp[key] = await answerData.saveAnswer(answser);
        })
    return resp;

}
exports.deletAnswer = async function (id) {
    return answerData.deleteAnswer(id)
};