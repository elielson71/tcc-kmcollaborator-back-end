// camada responsavel por se comunicar com banco
const database = require('../infra/database')
const bcrypt = require('bcrypt')

exports.getUsuario = function () {
    return database.query('select id_usuario,login,senha,nome_completo,email,administrador,data_cadastro from usuario ') // where=status='C'
}
exports.getAuthenticate = async function (login) {
    return database.query(`select id_usuario,login,senha,administrador from usuario where login='${login}'`)

}
exports.getOneUsuario = function (id_usuario) {
    return database.query(`select id_usuario,login,senha,nome_completo,email,administrador,data_cadastro from usuario where id_usuario=${id_usuario}`)
}
exports.getEmailLogin = function (email, login, id_usuario) {
    return database.query(`select id_usuario from usuario where (login='${login}' or email='${email}') ${id_usuario ? `and id_usuario<>${id_usuario}` : ''}`)
}
exports.saveUsuario = function (usuario) {
    const data_cadastro = new Date();
    return database.one('INSERT INTO usuario ( login,senha,nome_completo,email,administrador,data_cadastro) VALUES($1,$2,$3,$4,$5,$6) returning *',
        [usuario.login, criptografa(usuario.senha), usuario.nome_completo, usuario.email, usuario.administrador, data_cadastro])
}
exports.putUsuario = function (id, usuario) {
    return database.none(`UPDATE usuario SET login='${usuario.login}'
    ${usuario.senha ? `,senha='${criptografa(usuario.senha)}'` : ''},
    nome_completo='${usuario.nome_completo}',email='${usuario.email}',administrador='${usuario.administrador}' where id_usuario=${id}`)
}

exports.deleteUsuario = async function (id) {
    try {
        await database.none('DELETE FROM usuario WHERE id_usuario=$1', [id]);
        return { status: 1, message: 'usuario deletado com sucesso!' }
    } catch (e) {

        return { stutus: 2, mensage: ' error:' + e.detail }
    }
}

function criptografa(senha) {
    return bcrypt.hashSync(senha, 10)
}