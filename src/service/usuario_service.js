// camada responsavel pelas regras de negocio
const usuarioData = require('../data/usuario_data')
const profissionalData = require('../data/profissional_data')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authConfig = require('../infra/config/auth.json');


exports.getUsuario = () => usuarioData.getUsuario();
exports.getOneUsuario = async (id_usuario) => {
    const resp = await usuarioData.getOneUsuario(id_usuario)
    if (!resp) throw new Error('Usuario não Encontrado')
    return resp
}

exports.saveUsuario = async function (usuario) {
    const newUsuario = await usuarioData.saveUsuario(usuario);
    newUsuario.senha = undefined
    return newUsuario;
}
exports.saveUsuarioGrupo = async function (usuarioGrupo) {
    const existeUG = await usuarioData.existeUsuarioGrupo(usuarioGrupo)
    if (existeUG.length !== 0)
        return 'existe grupo vinculado ao usuarios'
    const newUsuarioGrupo = await usuarioData.saveUsuarioGrupo(usuarioGrupo);
    return newUsuarioGrupo;
}
exports.getAuthenticate = async function (usuario) {
    const { login, senha } = usuario

    const user = await usuarioData.getAuthenticate(login)
    if (user.length === 0) throw new Error('Usuario não Encontrado')
    if (!await bcrypt.compare(senha, user[0].senha)) throw new Error('Login e senha não confere')

    user[0].senha = undefined

    const profissional = await profissionalData.getUsurioProfissional(user[0].id_usuario);
    if (profissional[0]===undefined){
        profissional[0]={id_profissional:0}
    }

    const token = jwt.sign({ id: user[0].id_usuario, 'id_profissional': profissional[0].id_profissional }, authConfig.secret, {
        expiresIn: 86400
    })

    return {
        "login": user[0].login, "id_usuario": user[0].id_usuario,
        "tipo": user[0].administrador, "token": token, 'id_profissional': profissional[0].id_profissional
    }

}


exports.putUsuario = async function (id_usuario, usuario) {
    if (usuario.senha === (await usuarioData.getOneUsuario(id_usuario))[0].senha)
        delete usuario.senha

    await usuarioData.putUsuario(id_usuario, usuario);
    return 'ok'
}

exports.deletUsuario = async function (id) {
    return usuarioData.deleteUsuario(id)
};
exports.deleteUsuarioGrupo = async function (UsuarioGrupo) {
    return usuarioData.deleteUsuarioGrupo(UsuarioGrupo)
};

exports.existeEmailLogin = async function ({ login, email, id_usuario }) {
    const TABELA = await usuarioData.getEmailLogin(email, login, id_usuario)
    return TABELA.length !== 0

}
