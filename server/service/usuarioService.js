// camada responsavel pelas regras de negocio
const usuarioData = require('../data/usuarioData.js')


exports.getUsuario = () => usuarioData.getUsuario();
exports.getOneUsuario = async (id_usuario) => {
    return await usuarioData.getOneUsuario(id_usuario)
}

exports.saveUsuario = async function (usuario) {
    const newUsuario = await usuarioData.saveUsuario(usuario);
    return newUsuario;

}

exports.putUsuario = async function (id_usuario, usuario) {
    
    await usuarioData.putUsuario(id_usuario, usuario);
    return 'ok';
}

exports.deletUsuario = async function (id) {
    return usuarioData.deleteUsuario(id)
};

