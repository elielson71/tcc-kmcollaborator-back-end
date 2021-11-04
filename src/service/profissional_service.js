// camada responsavel pelas regras de negocio
const profissionalData = require('../data/profissionaldata.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authConfig = require('../infra/config/auth.json');


exports.getProfissional = () => profissionalData.getProfissional();
exports.getOneProfissional = async (id_profissional) => {
    const resp = await profissionalData.getOneProfissional(id_profissional)
    if (!resp) throw new Error('Profissional não Encontrado')
    return resp
}

exports.saveProfissional = async function (profissional) {
    const newProfissional = await profissionalData.saveProfissional(profissional);
    newProfissional.senha = undefined
    return newProfissional;
}
exports.getAuthenticate = async function (profissional) {
    const {login,senha} = profissional

    const user = await profissionalData.getAuthenticate(login)
    if(user.length===0)throw new Error('Profissional não Encontrado')
    if(!await bcrypt.compare(senha,user[0].senha)) throw new Error('Login e senha não confere')

    user[0].senha=undefined

    const token = jwt.sign({id:user[0].id_profissional},authConfig.secret,{
        expiresIn: 86400
    })
    
    return {"login":user[0].login,"id_profissional":user[0].id_profissional,"tipo":user[0].administrador,"token":token,}
        
}


exports.putProfissional = async function (id_profissional, profissional) {

     await profissionalData.putProfissional(id_profissional, profissional);
     return'ok'
}

exports.deletProfissional = async function (id) {
    return profissionalData.deleteProfissional(id)
};

exports.existeNome = async function ({ login, email,id_profissional}) {
    const TABELA = await profissionalData.getNomeProfissional(email, login,id_profissional)
    return TABELA.length !== 0

}
