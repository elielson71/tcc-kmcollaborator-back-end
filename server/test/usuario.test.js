const axios = require('axios');
const crypto = require('crypto')
const usuarioService = require('../service/usuarioService')

const generate = () => crypto.randomBytes(20).toString('hex')
const request =  function(url,method,data){  return axios({url,method,data})};
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
test.only('Should get One Usuario',async function(){
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