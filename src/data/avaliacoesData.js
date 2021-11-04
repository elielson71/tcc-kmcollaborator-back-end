// camada responsavel por se comunicar com banco
const database = require('../infra/database')

exports.getAvaliacoes = function(){
    return database.query('select id_avaliacoes,titulo from avaliacoes ') // where=status='C'
}
exports.getOneAvaliacoes = function(id_avaliacoes){
    return database.query(`select id_avaliacoes,titulo,tempo,id_departamento from avaliacoes where id_avaliacoes=${id_avaliacoes}`)
}
exports.getAvaliacoesItenQuestions = function(id_avaliacoes){
    return database.query(`SELECT 
    public.perguntas.conteudo,
    public.perguntas.id_perguntas,
    public.perguntas.tipo_resposta,
    public.perguntas.status,
    public.perguntas.id_responsavel,
    public.perguntas.senioridade,
    public.perguntas.nivel,
    public.departamento.id_departamento,
    public.departamento.nome AS descricao_depart
  FROM
    public.itens_avaliacoes
    INNER JOIN public.perguntas ON (public.itens_avaliacoes.id_perguntas = public.perguntas.id_perguntas)
    INNER JOIN public.departamento ON (public.perguntas.id_departamento = public.departamento.id_departamento)
  WHERE
    id_avaliacoes =${id_avaliacoes} and situacao='AB'`)
}
exports.getAvaliacoesQuestions = function(id_avaliacoes){
  
    return database.query(`
        SELECT 
          public.perguntas.id_perguntas,
          public.perguntas.conteudo,
          public.perguntas.tipo_resposta,
          public.perguntas.status,
          public.perguntas.id_responsavel,
          public.perguntas.id_departamento,
          public.perguntas.senioridade,
	      CASE 
            WHEN itens.id_avaliacoes =${id_avaliacoes}and itens.situacao='AB'
              THEN 'AB'
            ELSE  ''
          END AS situacao,
        itens.id_avaliacoes  as id_avaliacoes,
        CASE WHEN itens.id_avaliacoes =${id_avaliacoes}THEN nota_pergunta ELSE  null  END as nota_pergunta
        FROM
          public.perguntas
          left join ( select id_perguntas,id_avaliacoes,nota_pergunta,situacao from itens_avaliacoes where  itens_avaliacoes.id_avaliacoes=${id_avaliacoes})
          itens on perguntas.id_perguntas=itens.id_perguntas

  
  `)
    
}

exports.saveAvaliacoes = function (avaliacoes){
    return database.one('INSERT INTO avaliacoes ( titulo,tempo,id_usuario,id_departamento) VALUES($1,$2,$3,$4) returning *',
    [avaliacoes.titulo,(avaliacoes.tempo),1,avaliacoes.id_departamento])
}
exports.putAvaliacoes = function (id,avaliacoes){
    return database.none('UPDATE avaliacoes SET id_avaliacoes=$1, titulo=$2, tempo=$3, id_departamento=$4 where id_avaliacoes=$5',
    [avaliacoes.id_avaliacoes,avaliacoes.titulo,avaliacoes.tempo,avaliacoes.id_departamento,id])
}
exports.putAvaliacoesitensAvaliacoes = function (itensAvaliacoes){
    return database.none('UPDATE itens_avaliacoes SET nota_pergunta=$1, situacao=$2'+
     'where itens_avaliacoes.id_perguntas=$3 and itens_avaliacoes.id_avaliacoes=$4',
    [itensAvaliacoes.nota_pergunta,itensAvaliacoes.situacao?itensAvaliacoes.situacao:'A',itensAvaliacoes.id_perguntas,itensAvaliacoes.id_avaliacoes])
}
 exports.deleteAvaliacoes = async function(id){
    await database.none('DELETE FROM itens_avaliacoes WHERE id_avaliacoes=$1',[id]);
    return  await database.none('DELETE FROM avaliacoes WHERE id_avaliacoes=$1',[id]);
}
//id_avalicoes, avaliacoes.id_avaliacoes,avaliacoes.titulo,avaliacoes.tempo
//id_avalicoes, id_avaliacoes,titulo,tempo

//itens_avaliacoes,id_avaliacoes,id_avaliacoes,nota_pergunta,id_profissional,nota_profissional,id_perguntas
//itens_avaliacoes,id_avaliacoes=$1,id_avaliacoes=$2,nota_pergunta=$3,id_profissional=$4,nota_profissional=$5
//itensAvaliacoes.itens_avaliacoes,itensAvaliacoes.id_avaliacoes,itensAvaliacoes.id_avaliacoes,itensAvaliacoes.nota_pergunta,itensAvaliacoes.id_profissional,itensAvaliacoes.nota_profissional