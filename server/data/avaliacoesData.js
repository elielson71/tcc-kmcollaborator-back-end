// camada responsavel por se comunicar com banco
const database = require('../infra/database')

exports.getAvaliacoes = function(){
    return database.query('select id_avaliacoes,titulo from avaliacoes ') // where=status='C'
}
exports.getOneAvaliacoes = function(id_avaliacoes){
    return database.query(`select id_avaliacoes,titulo,tempo from avaliacoes where id_avaliacoes=${id_avaliacoes}`)
}
exports.getAvaliacoesQuestions = function(id_avaliacoes){
    return database.query(`SELECT 
    public.perguntas.id_perguntas,
    public.perguntas.conteudo,
    public.perguntas.tipo_resposta,
    public.perguntas.status,
    public.perguntas.id_responsavel,
    public.perguntas.senioridade,
    CASE 
      WHEN public.itens_avaliacoes.id_avaliacoes = ${id_avaliacoes} and public.itens_avaliacoes.situacao='AB'
        THEN 'AB'
      ELSE  ''
    END AS situacao,
    itens_avaliacoes.id_avaliacoes,
    CASE 
      WHEN public.itens_avaliacoes.id_avaliacoes = ${id_avaliacoes}
        THEN nota_pergunta
      ELSE  0
    END as nota_pergunta
    
  FROM
    public.perguntas
    LEFT OUTER JOIN public.itens_avaliacoes ON (public.perguntas.id_perguntas = public.itens_avaliacoes.id_perguntas)
    left join ( select id_perguntas from itens_avaliacoes where  itens_avaliacoes.id_avaliacoes=${id_avaliacoes})
    itens on perguntas.id_perguntas<>itens.id_perguntas
    where 
    perguntas.id_perguntas<>itens.id_perguntas
    
    union
    SELECT 
    public.perguntas.id_perguntas,
    public.perguntas.conteudo,
    public.perguntas.tipo_resposta,
    public.perguntas.status,
    public.perguntas.id_responsavel,
    public.perguntas.senioridade,
    CASE 
      WHEN public.itens_avaliacoes.id_avaliacoes = ${id_avaliacoes} and public.itens_avaliacoes.situacao='AB'
        THEN 'AB'
      ELSE  ''
    END AS situacao,
    itens_avaliacoes.id_avaliacoes,
    public.itens_avaliacoes.nota_pergunta
  FROM
    public.perguntas
    inner  JOIN public.itens_avaliacoes ON (public.perguntas.id_perguntas = public.itens_avaliacoes.id_perguntas)
    
    where 
    itens_avaliacoes.id_avaliacoes=${id_avaliacoes}
  
  `)
    
}

exports.saveAvaliacoes = function (avaliacoes){
    return database.one('INSERT INTO avaliacoes ( titulo,tempo,id_usuario) VALUES($1,$2,$3) returning *',
    [avaliacoes.titulo,(avaliacoes.tempo),avaliacoes.id_usuario])
}
exports.putAvaliacoes = function (id,avaliacoes){
    return database.none('UPDATE avaliacoes SET id_avaliacoes=$1, titulo=$2, tempo=$3 where id_avaliacoes=$4',
    [avaliacoes.id_avaliacoes,avaliacoes.titulo,avaliacoes.tempo,id])
}
exports.putAvaliacoesitensAvaliacoes = function (itensAvaliacoes){
    return database.none('UPDATE itens_avaliacoes SET nota_pergunta=$1, situacao=$2'+
     'where itens_avaliacoes.id_perguntas=$3 and itens_avaliacoes.id_avaliacoes=$4',
    [itensAvaliacoes.nota_pergunta,itensAvaliacoes.situacao,itensAvaliacoes.id_perguntas,itensAvaliacoes.id_avaliacoes])
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