
const linksData = require('../data/links_data')

exports.saveLinks = async function (links) {
    let resp = []
    if (links)
        Object.values(links).forEach(async function (value, key) {
            let midias ={}
            midias['dados'] = value.dados
            midias['id_midia'] = value.id_midia
            midias['id_perguntas'] = value.id_perguntas
            resp[key] = await linksData.saveLinks(midias)
        })
    return resp;

}
exports.deletLinks = async function (id) {
    return linksData.deleteLinks(id)
};