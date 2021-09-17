// camada responsavel por rotear recebendo as requisições

const express = require('express');
const authMiddleware = require('../middleware/auth')
const router = express.Router();
router.use(authMiddleware)
const usuarioService = require('../service/usuarioService')

router.get('/api/usuario', async function (req, res) {
    const usuario = await usuarioService.getUsuario();
    res.json(usuario)

})
router.get('/api/usuario/:id', async function (req, res) {
    try {
        const usuario = await usuarioService.getOneUsuario(req.params.id)
        res.cookie(usuario.token,{httpOnly:true})
        res.status(200).json(usuario)
    } catch (e) {
        res.status(404).send(e.message)
    }

})

router.post('/api/usuario', async function (req, res) {
    const usuario = req.body;
    if (await usuarioService.existeEmailLogin(usuario)) {
        res.status(404).send("Email ou Login já existe!")
    } else {
        const newUsuario = await usuarioService.saveUsuario(usuario)
        res.status(201).json(newUsuario)
    }
})

router.put('/api/usuario/:id', async function (req, res) {
    const usuario = req.body;
    if (await usuarioService.existeEmailLogin(usuario)) {
        res.status(404).send("Email ou Login já existe!")
    } else {
        const respusuario = await usuarioService.putUsuario(req.params.id, usuario)
        res.status(204).json(respusuario).end()
    }

})
router.delete('/api/usuario/:id', async function (req, res) {
    const respUsuarioDelete = await usuarioService.deletUsuario(req.params.id)
    if(respUsuarioDelete.status===1)
    res.status(204).json(respUsuarioDelete).end()
    else{
        res.status(400).json(respUsuarioDelete.mensage)
    }
})

module.exports = router

