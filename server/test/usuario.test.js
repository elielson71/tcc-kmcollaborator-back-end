const axios = require('axios');
const crypto = require('crypto')
const usuarioService = require('../service/usuarioService')

const generate = () => crypto.randomBytes(20).toString('hex')
const request =  function(url,method,data){  return axios({url,method,data})};
test.only('Should get Usuario',async function(){
    //given - dado que 
    const usuario2 = await usuarioService.saveUsuario({login:generate(),senha:'1234',nome_completo:generate(),email:generate(),administrador:'N'})   
     //when - quando acontecer
    const response = await request('http://localhost:3001/usuario','get')
    const usuario = response.data
    // then - então
    expect(response.status).toBe(200);
    expect(usuario.login).toBe(usuario2.login)
    await usuarioService.deletUsuario(usuario2.id_perguntas)

        
})
 
test('Should post Usuario',async function(){
    //given - dado que 
    const data = {conteudo:generate(),tipo_resposta:'C',id_responsavel:1,senioridade:'J',id_departamento:1,nivel:'F'}
    //when - quando acontecer
    const response = await request('http://localhost:3001/usuario','post',data)
    const usuario = response.data
    // then - então
    
    expect(usuario.conteudo).toBe(data.conteudo)
    await usuarioService.deletUsuario(usuario.id_perguntas)
});
test('Should get One Usuario',async function(){
    //given -
    const usuario = await usuarioService.saveUsuario({
        conteudo:generate(),tipo_resposta:'C',id_responsavel:1,senioridade:'J',id_departamento:1,nivel:'F',
        answers:[{descricao:generate(),isTrue:false},{descricao:generate(),isTrue:false},{descricao:generate(),isTrue:true}]
    })  
     //when - quando acontecer
    const respUsuario = await request(`http://localhost:3001/usuario/${usuario.id_perguntas}`,'get')
    const respAnswer = await request(`http://localhost:3001/usuario/answer/${usuario.id_perguntas}`,'get')
    
    // then - então
    expect(respUsuario.data[0].conteudo).toBe(usuario.conteudo)
    
    //expect(respAnswer.data.conteudo).toBe(usuario.data.answers[0].descricao);
    await usuarioService.deletUsuario(usuario.id_perguntas)
})