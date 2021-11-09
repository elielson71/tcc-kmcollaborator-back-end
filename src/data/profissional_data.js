// camada responsavel por se comunicar com banco
const database = require('../infra/database')

exports.getProfissional = function () {
    return database.query(`select id_profissional,nome_completo, cpf,
     endereco,bairro,complementar, data_nascimento, telefone, celular,
     cargo, id_departamento, nivel_senioridade, id_usuario,data_cadastro
      from profissional order by id_profissional`) 
}
exports.getUsurioProfissional = function (id_usuario) {
    return database.query(`select id_profissional
      from profissional where id_usuario=${id_usuario}`) // where=status='C'
}

exports.getOneProfissional = function (id_profissional) {
    return database.query(`select id_profissional,nome_completo, cpf, 
    endereco,bairro,complementar, data_nascimento, 
    telefone, celular,cargo, id_departamento, nivel_senioridade, 
    id_usuario,data_cadastro
      from profissional where id_profissional=${id_profissional}`)
}
exports.getUsuarioProfissional = function(id_usuario){
    return database.query(`select id_profissional from profissional 
    where id_usuario=${id_usuario}`)
}
exports.getNomeProfissional = function(nome,id_profissional){
    return database.query(`select id_profissional from profissional 
    where nome_completo='${nome}' 
    ${id_profissional?`and id_profissional<>${id_profissional}`:''}`)
}
exports.saveProfissional = function (profissional) {
    console.log(profissional)
    profissional.id_departamento=profissional.id_departamento?profissional.id_departamento:undefined
    profissional.id_usuario=profissional.id_usuario?profissional.id_usuario:undefined
    const data_cadastro = new Date();
    return database.one(`INSERT INTO profissional (nome_completo, cpf, 
        endereco, bairro,complementar, telefone, celular,cargo,
         id_departamento, nivel_senioridade, id_usuario,data_cadastro)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) returning *`,
        [profissional.nome_completo, profissional.cpf, profissional.endereco,
             profissional.bairro, profissional.complementar, profissional.telefone, 
             profissional.celular, profissional.cargo, profissional.id_departamento, 
             profissional.nivel_senioridade, profissional.id_usuario, data_cadastro])
}
exports.putProfissional = function (id, profissional) {
    console.log(profissional)

    return database.none(`UPDATE profissional SET nome_completo=$1,cpf=$2,
    endereco=$3,bairro=$4,complementar=$5,telefone=$6,celular=$7,cargo=$8,id_departamento=$9,
    nivel_senioridade=$10,id_usuario=$11 where id_profissional=$12`,
    [profissional.nome_completo, profissional.cpf, profissional.endereco, profissional.bairro,
        profissional.complementar, profissional.telefone, profissional.celular, 
        profissional.cargo, profissional.id_departamento, profissional.nivel_senioridade,
         profissional.id_usuario,id])
}

exports.deleteProfissional = async function (id) {
    try {
        await database.none('DELETE FROM profissional WHERE id_profissional=$1', [id]);
        return { status: 1, message: 'profissional deletado com sucesso!' }
    } catch (e) {

        return { stutus: 2, mensage: ' error:' + e.detail }
    }
}
