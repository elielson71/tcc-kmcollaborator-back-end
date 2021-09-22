// camada responsavel por rotear recebendo as requisições

const express = require('express');
const authMiddleware = require('../middleware/auth')
const router = express.Router();
router.use(authMiddleware)
const profissionalService = require('../service/profissionalService')

router.get('/api/profissional', async function (req, res) {
    const profissional = await profissionalService.getProfissional();
    res.json(profissional)

})
router.get('/api/profissional/:id', async function (req, res) {
    //try {
        const profissional = await profissionalService.getOneProfissional(req.params.id)
        res.status(200).json(profissional)
    /*} catch (e) {
        res.status(404).send(e.message)
    }*/

})

router.post('/api/profissional', async function (req, res) {
    const profissional = req.body;
    if (await profissionalService.existeNome(profissional)) {
        res.status(404).send("Email ou Login já existe!")
    } else {
        const newProfissional = await profissionalService.saveProfissional(profissional)
        res.status(201).json(newProfissional)
    }
})

router.put('/api/profissional/:id', async function (req, res) {
    const profissional = req.body;
    if (await profissionalService.existeNome(profissional)) {
        res.status(404).send("Nome existe!")
    } else {
        const respprofissional = await profissionalService.putProfissional(req.params.id, profissional)
        res.status(204).json(respprofissional).end()
    }

})
router.delete('/api/profissional/:id', async function (req, res) {
    const respProfissionalDelete = await profissionalService.deletProfissional(req.params.id)
    if(respProfissionalDelete.status===1)
    res.status(204).json(respProfissionalDelete).end()
    else{
        res.status(400).json(respProfissionalDelete.mensage)
    }
})

module.exports = router

