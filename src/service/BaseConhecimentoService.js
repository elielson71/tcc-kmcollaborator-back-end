// camada responsavel pelas regras de negocio
const baseconhecimentoData = require('../data/BaseConhecimentodata.js')
const profissionalData = require('../data/ProfissionalData')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authConfig = require('../infra/config/auth.json');


exports.getBaseConhecimento = () => baseconhecimentoData.getBaseConhecimento();
exports.getOneBaseConhecimento = async (id_baseconhecimento) => {
    const resp = await baseconhecimentoData.getOneBaseConhecimento(id_baseconhecimento)
    if (!resp) throw new Error('BaseConhecimento não Encontrado')
    return resp
}

exports.saveBaseConhecimento = async function (baseconhecimento) {
    const newBaseConhecimento = await baseconhecimentoData.saveBaseConhecimento(baseconhecimento);
    newBaseConhecimento.senha = undefined
    return newBaseConhecimento;
}

exports.putBaseConhecimento = async function (id_baseconhecimento, baseconhecimento) {
    if (baseconhecimento.senha === (await baseconhecimentoData.getOneBaseConhecimento(id_baseconhecimento))[0].senha)
        delete baseconhecimento.senha

    await baseconhecimentoData.putBaseConhecimento(id_baseconhecimento, baseconhecimento);
    return 'ok'
}

exports.deletBaseConhecimento = async function (id) {
    return baseconhecimentoData.deleteBaseConhecimento(id)
};
exports.deleteBaseConhecimentoGrupo = async function (BaseConhecimentoGrupo) {
    return baseconhecimentoData.deleteBaseConhecimentoGrupo(BaseConhecimentoGrupo)
};
exports.existeBaseConhecimento = async function ({nome}){
    const TABELA = await baseconhecimentoData.existeBaseConhecimento(nome)
    return TABELA.length !== 0
}
