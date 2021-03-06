// camada responsavel por rotear recebendo as requisições
const express = require('express');
const authMiddleware = require('../middleware/auth')
const router = express.Router();
router.use(authMiddleware)
const questionsService = require('../service/questions_service')
const answerService = require('../service/answer_service')
const linksService = require('../service/links_service')

router.get('/api/questions', async function(req,res){
    const questions = await questionsService.getQuestions();
    res.json(questions)

})
router.get('/api/questions/:id', async function(req,res){
    const questions = await questionsService.getOneQuestion(req.params.id)
    res.json(questions)
})
router.get('/api/questions/answer/:id', async function(req,res){
    const answer = await questionsService.getQuestionAnswer(req.params.id)
    res.json(answer)
})
router.get('/api/questions/links/:id', async function(req,res){
    const links = await questionsService.getQuestionLinks(req.params.id)
    res.json(links)
})

router.post('/api/questions', async function(req,res){
    const questions = req.body;
    const newQuestion = await questionsService.saveQuestion(questions)
    res.status(201).json(newQuestion)

})
router.post('/api/questions/answer', async function(req,res){
    const answer = req.body;
    const newAnswer = await answerService.saveAnswer(answer)
    res.status(201).json(newAnswer)

})
router.put('/api/questions/:id', async function(req,res){
    const question = req.body;
    const respQuestions = await questionsService.putQuestion(req.params.id,question)
    res.status(204).json(respQuestions)
    
})
router.delete('/api/questions/:id', async function(req,res){
    const respQuestionDelete = await questionsService.deletQuestion(req.params.id)
    res.status(204).json(respQuestionDelete)
})
router.delete('/api/answer/:id', async function(req,res){
    const respQuestionDelete = await answerService.deletAnswer(req.params.id)
    res.status(204).json(respQuestionDelete)
})
router.delete('/api/links/:id', async function(req,res){
    const respQuestionDelete = await linksService.deletLinks(req.params.id)
    res.status(204).json(respQuestionDelete)
})

module.exports = router

