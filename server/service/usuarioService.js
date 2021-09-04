// camada responsavel pelas regras de negocio
const usuarioData = require('../data/usuarioData.js')


exports.getUsuario = () => usuarioData.getUsuario();
exports.getOneUsuario = async (id_usuario) => {
    const resp = await usuarioData.getOneUsuario(id_usuario)
    if (!resp) throw new Error('Usuario não Encontrado')
    return resp
}

exports.saveUsuario = async function (usuario) {
    const newUsuario = await usuarioData.saveUsuario(usuario);
    return newUsuario;


}

exports.putUsuario = async function (id_usuario, usuario) {

     await usuarioData.putUsuario(id_usuario, usuario);
     return'ok'



}

exports.deletUsuario = async function (id) {
    return usuarioData.deleteUsuario(id)
};

exports.existeEmailLogin = async function ({ login, email,id_usuario}) {
    
    const TABELA = await usuarioData.getEmailLogin(email, login,id_usuario)
    console.log(await TABELA.length !== 0)
    return TABELA.length !== 0

}
