const axios = require('axios');
const crypto = require('crypto')
const questionsService = require('../service/questionsService')
const answerData = require('../data/answerData')

const generate = () => crypto.randomBytes(20).toString('hex')
const request =  function(url,method,data){  return axios({url,method,data})};
test.only('Should get Questions',async function(){
    //given - dado que 
    const question2 = await questionsService.saveQuestion({conteudo:generate(),tipo_resposta:'C',id_responsavel:1,senioridade:'J',id_departamento:1,nivel:'F'})    //when - quando acontecer
    const response = await request('http://localhost:3001/questions','get')
    const questions = response.data
    // then - então

    //console.log(response)
    //expect(questions.conteudo).toBe(question2.conteudo);
    await questionsService.deletQuestion(question2.id_perguntas)

        
})
 
test('Should post Questions',async function(){
    //given - dado que 
    const data = {conteudo:generate(),tipo_resposta:'C',id_responsavel:1,senioridade:'J',id_departamento:1,nivel:'F'}
    //when - quando acontecer
    const response = await request('http://localhost:3001/questions','post',data)
    const question = response.data
    // then - então
    
    expect(question.conteudo).toBe(data.conteudo)
    await questionsService.deletQuestion(question.id_perguntas)
});
test('Should get One Questions',async function(){
    //given -
    const question = await questionsService.saveQuestion({
        conteudo:generate(),tipo_resposta:'C',id_responsavel:1,senioridade:'J',id_departamento:1,nivel:'F',
        answers:[{descricao:generate(),isTrue:false},{descricao:generate(),isTrue:false},{descricao:generate(),isTrue:true}]
    })  
     //when - quando acontecer
    const respQuestion = await request(`http://localhost:3001/questions/${question.id_perguntas}`,'get')
    const respAnswer = await request(`http://localhost:3001/questions/answer/${question.id_perguntas}`,'get')
    
    // then - então
    expect(respQuestion.data[0].conteudo).toBe(question.conteudo)
    
    //expect(respAnswer.data.conteudo).toBe(question.data.answers[0].descricao);
    await questionsService.deletQuestion(question.id_perguntas)
})