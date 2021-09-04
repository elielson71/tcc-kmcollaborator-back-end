// camada responsavel por rotear recebendo as requisições
const express = require('express');
const router = express.Router();
const usuarioService = require('../service/usuarioService')


router.get('/usuario', async function(req,res){
    const usuario = await usuarioService.getUsuario();
    res.json(usuario)

})
router.get('/usuario/:id', async function(req,res){
    const usuario = await usuarioService.getOneUsuario(req.params.id)
    res.status(200).json(usuario)
})

router.post('/usuario', async function(req,res){
    const usuario = req.body;
    const newUsuario = await usuarioService.saveUsuario(usuario)
    res.status(201).json(newUsuario)

})

router.put('/usuario/:id', async function(req,res){
    const Usuario = req.body;
    const respusuario = await usuarioService.putUsuario(req.params.id,Usuario)
    res.status(204).json(respusuario)
    
})
router.delete('/usuario/:id', async function(req,res){
    const respUsuarioDelete = await usuarioService.deletUsuario(req.params.id)
    res.status(204).json(respUsuarioDelete)
})

module.exports = router

