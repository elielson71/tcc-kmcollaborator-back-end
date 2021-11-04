// camada responsavel pelas regras de negocio
const grupoData = require('../data/grupo_data')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authConfig = require('../infra/config/auth.json');


exports.getGrupo = () => grupoData.getGrupo();
exports.getOneGrupo = async (id_grupo) => {
    const resp = await grupoData.getOneGrupo(id_grupo)
    if (!resp) throw new Error('Grupo não Encontrado')
    return resp
}
exports.getUsuarioGrupo = async (id_usuario) => {
    const resp = await grupoData.getUsuarioGrupo(id_usuario)
    if (!resp) throw new Error('Usuario_Grupo não Encontrado')
    return resp
}

exports.saveGrupo = async function (grupo) {
    const newGrupo = await grupoData.saveGrupo(grupo);
    newGrupo.senha = undefined
    return newGrupo;
}

exports.putGrupo = async function (id_grupo, grupo) {

     await grupoData.putGrupo(id_grupo, grupo);
     return'ok'
}

exports.deletGrupo = async function (id) {
    return grupoData.deleteGrupo(id)
};

exports.existeNome = async function ({ nome,id_grupo}) {
    const TABELA = await grupoData.getNomeGrupo(nome,id_grupo)
    return TABELA.length !== 0

}
