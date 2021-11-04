// camada responsavel por se comunicar com banco
const database = require('../infra/database')
const bcrypt = require('bcrypt')

exports.getDepartamento = function(){
    return database.query('select id_departamento,nome from departamento ') // where=status='C'
}
exports.getOneDepartamento = function(id_departamento){
    return database.query(`select id_departamento,nome from departamento where id_departamento=${id_departamento}`)
}
exports.getIdDepartamento = function(nome){
    return database.query(`select id_departamento from departamento where nome='${nome}'`)
}
exports.saveDepartamento = function (departamento){
    return database.one('INSERT INTO departamento ( nome) VALUES($1) returning *',
    [departamento.nome])
}
exports.putDepartamento = function (id,departamento){
    return database.none('UPDATE departamento SET nome=$1 where id_departamento=$2',
    [departamento.nome,id])
}
 exports.deleteDepartamento = async function(id){
    return  await database.none('DELETE FROM departamento WHERE id_departamento=$1',[id]);
}
