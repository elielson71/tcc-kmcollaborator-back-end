// camada responsavel por rotear recebendo as requisições
const express = require('express');
const authMiddleware = require('../middleware/auth')
const router = express.Router();
router.use(authMiddleware)
const avaliacoesService = require('../service/avaliacoesService')
const itensAvaliacoesService = require('../service/itensAvaliacoesService');
const { Router } = require('express');

router.get('/avaliacoes', async function(req,res){
    const avaliacoes = await avaliacoesService.getAvaliacoes();
    res.json(avaliacoes)

})
router.get('/avaliacoes/:id', async function(req,res){
    const avaliacoes = await avaliacoesService.getOneAvaliacoes(req.params.id)
    res.json(avaliacoes)
})
router.get('/avaliacoes/itensquestions/:id', async function(req,res){
    const questions = await avaliacoesService.getAvaliacoesItenQuestions(req.params.id)
    res.json(questions)
})
router.get('/avaliacoes/questions/:id', async function(req,res){
    const questions = await avaliacoesService.getAvaliacoesQuestions(req.params.id)
    res.json(questions)
})

router.post('/avaliacoes', async function(req,res){
    const avaliacoes = req.body;
    //console.log(avaliacoes)
    const newAvaliacoes = await avaliacoesService.saveAvaliacoes(avaliacoes)
    res.status(201).json(newAvaliacoes)

})
router.post('/avaliacoes/itensAvaliacoes', async function(req,res){
    const itensAvaliacoes = req.body;
    const newitensAvaliacoes = await itensAvaliacoesService.saveItensAvaliacoes(itensAvaliacoes)
    res.status(201).json(newitensAvaliacoes)

})
router.put('/avaliacoes/:id', async function(req,res){
    const Avaliacoes = req.body;
    const respavaliacoes = await avaliacoesService.putAvaliacoes(req.params.id,Avaliacoes)
    res.status(204).json(respavaliacoes)
    
})
router.delete('/avaliacoes/:id', async function(req,res){
    const respAvaliacoesDelete = await avaliacoesService.deletAvaliacoes(req.params.id)
    res.status(204).json(respAvaliacoesDelete)
})

module.exports = router

