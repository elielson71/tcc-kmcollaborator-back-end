const axios = require('axios');
const crypto = require('crypto')
const questionsService = require('../service/questionsService')
const answerData = require('../data/answerData')

const generate = () => crypto.randomBytes(20).toString('hex')
const request =  function(url,method,data){  return axios({url,method,data,validateStatus:false})}
    
test('Should get Questions',async function(){
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

const user= {login:generate(),senha:'1234',nome_completo:generate(),email:generate(),administrador:'N'}
test('Should get OneUsuario',async function(){
    //given - dado que 
    const user= {login:generate(),senha:'1234',nome_completo:generate(),email:generate(),administrador:'N'}
    const usuario2 = await usuarioService.saveUsuario(user)   
     //when - quando acontecer
    const response = await request('http://localhost:3001/usuario','get')
    const usuario = response.data
    // then - então
    expect(response.status).toBe(200);
    //expect(usuario.login).toBe(usuario2.login)
    //await usuarioService.deletUsuario(usuario2.id_perguntas)

        
})
 
test('Should post Usuario',async function(){
    //given - dado que 
    const user= {login:generate(),senha:'1234',nome_completo:generate(),email:generate(),administrador:'N'}

    const data = user
    //when - quando acontecer
    const response = await request('http://localhost:3001/usuario','post',data)
    const usuario = response.data
    // then - então
    
    expect(usuario.conteudo).toBe(data.conteudo)
    await usuarioService.deletUsuario(usuario.id_usuario)
});
test('Should get One Usuario',async function(){
    //given -
    const user= {login:generate(),senha:'1234',nome_completo:generate(),email:generate(),administrador:'N'}

    const usuario = await usuarioService.saveUsuario(user)  
     //when - quando acontecer
    const respUsuario = await request(`http://localhost:3001/usuario/${usuario.id_usuario}`,'get')
    
    // then - então
    expect(respUsuario.data[0].login).toBe(usuario.login)
    
    //expect(respAnswer.data.conteudo).toBe(usuario.data.answers[0].descricao);
    await usuarioService.deletUsuario(usuario.id_usuario)
})
test.only('Should login not found',async function(){
    //given -
    const user= {login:'Elielso',senha:'1234'}
    
     //when - quando acontecer
    const respUsuario = await request(`http://localhost:3001/authenticate`,'post',user)
    
    // then - então
    expect(404).toBe(respUsuario.status)
    console.log(respUsuario.data)

})
test.only('Should login password Invalid',async function(){
    //given -
    const user= {login:'Elielson',senha:'12341'}
    
     //when - quando acontecer
    const respUsuario = await request(`http://localhost:3001/authenticate`,'post',user)
    
    // then - então
    expect(401).toBe(respUsuario.status)
    console.log(respUsuario.data)

})