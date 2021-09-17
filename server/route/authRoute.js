// camada responsavel por rotear recebendo as requisições

const express = require('express');
const jwt = require('jsonwebtoken')
const authConfig = require('../infra/config/auth.json')
const router = express.Router();
const usuarioService = require('../service/usuarioService')


router.post('/api/authenticate', async function (req, res) {
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
router.get('/api/checkToken', async function (req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No toke provided' })

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' })


    jwt.verify(token, authConfig.secret, function (err) {
        if (err) {
            res.status(401).send('Não autorizado: Token inválido!');
        } else {
            res.status(200).send('ok')
        }

    })

})
router.get('/api/destroyToken', async function (req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No toke provided' })

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' })

        res.cookie('token',null,{httpOnly:true});
        res.status(200).send("Sessão finalizada com sucesso!");

})


module.exports = router

