// camada responsavel por rotear recebendo as requisições

const express = require('express');
const router = express.Router();
const usuarioService = require('../service/usuarioService')


router.get('/usuario', async function (req, res) {
    const usuario = await usuarioService.getUsuario();
    res.json(usuario)

})
router.get('/usuario/:id', async function (req, res) {
    try {
        const usuario = await usuarioService.getOneUsuario(req.params.id)
        res.cookie(usuario.token,{httpOnly:true})
        res.status(200).json(usuario)
    } catch (e) {
        res.status(404).send(e.message)
    }

})

router.post('/usuario', async function (req, res) {
    const usuario = req.body;
    if (await usuarioService.existeEmailLogin(usuario)) {
        res.status(404).send("Email ou Login já existe!")
    } else {
        const newUsuario = await usuarioService.saveUsuario(usuario)
        res.status(201).json(newUsuario)
    }
})
router.post('/authenticate', async function (req, res) {
    const user = req.body;
    try {
        const resp = await usuarioService.getAuthenticate(user)
        res.status(200).send(resp)
    } catch (e) {
        if (e.message === 'Usuario não Encontrado') {
            res.status(404).send('Usuario não Encontrado')
        } else if (e.message === 'Login e senha não confere') {
            res.status(401).send('Login e senha não confere')
        }
    }
})

router.put('/usuario/:id', async function (req, res) {
    const usuario = req.body;
    if (await usuarioService.existeEmailLogin(usuario)) {
        res.status(404).send("Email ou Login já existe!")
    } else {
        const respusuario = await usuarioService.putUsuario(req.params.id, usuario)
        res.status(204).json(respusuario).end()
    }

})
router.delete('/usuario/:id', async function (req, res) {
    const respUsuarioDelete = await usuarioService.deletUsuario(req.params.id)
    res.status(204).json(respUsuarioDelete).end()
})

module.exports = router

