// camada responsavel pelas regras de negocio
const departamentoData = require('../data/departamento_data')

exports.getDepartamento = () => departamentoData.getDepartamento();
exports.getOneDepartamento = async (id_departamento) => {
    const resp = await departamentoData.getOneDepartamento(id_departamento)
    if (!resp) throw new Error('Departamento não Encontrado')
    return resp
}

exports.saveDepartamento = async function (nome) {
    const newDepartamento = await departamentoData.saveDepartamento(nome);
    return newDepartamento;


}

exports.putDepartamento = async function (id_departamento, nome) {
     await departamentoData.putDepartamento(id_departamento, nome);
     return'ok'
}

exports.deletDepartamento = async function (id) {
    return departamentoData.deleteDepartamento(id)
};

exports.existeDepartamento = async function ({nome}) {
    const TABELA = await departamentoData.getIdDepartamento(nome)
    return TABELA.length !== 0

}
