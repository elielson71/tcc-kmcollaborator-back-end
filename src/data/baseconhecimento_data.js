// camada responsavel por se comunicar com banco
const database = require('../infra/database')
const bcrypt = require('bcrypt')

exports.getBaseConhecimento = function () {
    return database.query(`select id_midia,nome,url,id_responsavel,tipo,data_cadastro from midia`)
}

exports.getOneBaseConhecimento = function (id_midia) {
    return database.query(`select id_midia,nome,url,id_responsavel,tipo,data_cadastro
     from midia where id_midia=${id_midia}`)
}
exports.existeBaseConhecimento= function (nome) {
    console.log(nome)
    return database.query(`SELECT 
    id_midia
  FROM
    public.midia
  WHERE
    public.midia.nome='${nome}'`)
}

exports.saveBaseConhecimento = function (baseconhecimento) {
    const data_cadastro = new Date();
    const path = (baseconhecimento.path).substring(11)
    return database.one('INSERT INTO midia ( nome,url,id_responsavel,tipo,data_cadastro) VALUES($1,$2,$3,$4,$5) returning *',
        [baseconhecimento.originalname, path,baseconhecimento.id_resposavel , baseconhecimento.mimetype, data_cadastro])
}

exports.putBaseConhecimento = function (id, baseconhecimento) {
    return database.none(`UPDATE midia SET login='${baseconhecimento.login}'
    ${baseconhecimento.senha ? `,senha='${criptografa(baseconhecimento.senha)}'` : ''},
    nome_completo='${baseconhecimento.nome_completo}',email='${baseconhecimento.email}',administrador='${baseconhecimento.administrador}' where id_midia=${id}`)
}

exports.deleteBaseConhecimento = async function (id) {
    try {
        await database.none('DELETE From midia WHERE id_midia=$1', [id]);
        return { status: 1, message: 'baseconhecimento deletado com sucesso!' }
    } catch (e) {

        return { stutus: 2, mensage: ' error:' + e.detail }
    }
}

exports.deleteBaseConhecimentoGrupo = async function (baseconhecimentoGrupo) {
    try {
        await database.none('DELETE From midia_grupo WHERE id_midia=$1 and id_grupo=$2'
        , [baseconhecimentoGrupo.id_midia,baseconhecimentoGrupo.id_grupo]);
        return { status: 1, message: 'baseconhecimento deletado com sucesso!' }
    } catch (e) {

        return { stutus: 2, mensage: ' error:' + e.detail }
    }
}
function criptografa(senha) {
    return bcrypt.hashSync(senha, 10)
}