// camada responsavel por rotear recebendo as requisições

const express = require('express');
const authMiddleware = require('../middleware/auth')
const router = express.Router();
router.use(authMiddleware)
const correcaoService = require('../service/correcaoService')

router.get('/api/correcao', async function (req, res) {
    const correcao = await correcaoService.getCorrecao();
    res.json(correcao)

})
router.get('/api/correcao/:id', async function (req, res) {
    try {
        const correcao = await correcaoService.getOneCorrecao(req.params.id)
        res.status(200).json(correcao)
    } catch (e) {
        res.status(404).send(e.message)
    }

})
router.get('/api/correcao/itensquestions/:id', async function(req,res){
    const questions = await correcaoService.getCorrecaoItensQuestions(req.params.id)
    res.json(questions)
})
router.post('/api/correcao/itensrespostas/:id', async function(req,res){
    const correcao = req.body;
    const questions = await correcaoService.getRespostaCorrecao(correcao)
    res.json(questions)
})

router.post('/api/correcao', async function (req, res) {
    const correcao = req.body;
    const newCorrecao = await correcaoService.saveCorrecao(correcao)
    res.status(201).json(newCorrecao)
})

router.put('/api/correcao/:id', async function (req, res) {
    const correcao = req.body;
    const respcorrecao = await correcaoService.putCorrecao(req.params.id, correcao)
    res.status(204).json(respcorrecao).end()


})
router.delete('/api/correcao/:id', async function (req, res) {
    const respCorrecaoDelete = await correcaoService.deletCorrecao(req.params.id)
    if (respCorrecaoDelete.status === 1)
        res.status(204).json(respCorrecaoDelete).end()
    else {
        res.status(400).json(respCorrecaoDelete.mensage)
    }
})

module.exports = router

