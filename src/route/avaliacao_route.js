// camada responsavel por rotear recebendo as requisições
const express = require('express');
const authMiddleware = require('../middleware/auth')
const router = express.Router();
router.use(authMiddleware)
const avaliacoesService = require('../service/avaliacoes_service')
const itensAvaliacoesService = require('../service/itensavaliacoes_service');

router.get('/api/avaliacoes', async function(req,res){
    const avaliacoes = await avaliacoesService.getAvaliacoes();
    res.json(avaliacoes)

})
router.get('/api/avaliacoes/:id', async function(req,res){
    const avaliacoes = await avaliacoesService.getOneAvaliacoes(req.params.id)
    res.json(avaliacoes)
})
router.get('/api/avaliacoes/itensquestions/:id', async function(req,res){
    const questions = await avaliacoesService.getAvaliacoesItenQuestions(req.params.id)
    res.json(questions)
})
router.get('/api/avaliacoes/questions/:id', async function(req,res){
    const questions = await avaliacoesService.getAvaliacoesQuestions(req.params.id)
    res.json(questions)
})

router.post('/api/avaliacoes', async function(req,res){
    const avaliacoes = req.body;
    //console.log(avaliacoes)
    const newAvaliacoes = await avaliacoesService.saveAvaliacoes(avaliacoes)
    res.status(201).json(newAvaliacoes)

})
router.post('/api/avaliacoes/itensAvaliacoes', async function(req,res){
    const itensAvaliacoes = req.body;
    const newitensAvaliacoes = await itensAvaliacoesService.saveItensAvaliacoes(itensAvaliacoes)
    res.status(201).json(newitensAvaliacoes)

})
router.put('/api/avaliacoes/:id', async function(req,res){
    const Avaliacoes = req.body;
    const respavaliacoes = await avaliacoesService.putAvaliacoes(req.params.id,Avaliacoes)
    res.status(204).json(respavaliacoes)
    
})
router.delete('/api/avaliacoes/:id', async function(req,res){
    const respAvaliacoesDelete = await avaliacoesService.deletAvaliacoes(req.params.id)
    res.status(204).json(respAvaliacoesDelete)
})

module.exports = router

