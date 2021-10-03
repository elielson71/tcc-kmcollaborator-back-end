// camada responsavel por se comunicar com banco
const database = require('../infra/database')

exports.getGrupo = function () {
    return database.query(`select id_grupo,nome from grupo `) // where=status='C'
}

exports.getOneGrupo = function (id_grupo) {
    return database.query(`select id_grupo,nome
      from grupo where id_grupo=${id_grupo}`)
}
exports.getNomeGrupo = function(nome,id_grupo){
    return database.query(`select id_grupo from grupo 
    where nome='${nome}' 
    ${id_grupo?`and id_grupo<>${id_grupo}`:''}`)
}
exports.saveGrupo = function (grupo) {
    return database.one(`INSERT INTO grupo (nome)
          VALUES($1) returning *`,
        [grupo.nome])
}
exports.putGrupo = function (id, grupo) {
    return database.none('UPDATE grupo SET nome=$1 where id_grupo=$2',
    [grupo.nome,id])
}

exports.deleteGrupo = async function (id) {
    try {
        await database.none('DELETE FROM grupo WHERE id_grupo=$1', [id]);
        return { status: 1, message: 'grupo deletado com sucesso!' }
    } catch (e) {

        return { stutus: 2, mensage: ' error:' + e.detail }
    }
}
