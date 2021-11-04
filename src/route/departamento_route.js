// camada responsavel por rotear recebendo as requisições
const { response } = require('express');
const express = require('express');
const authMiddleware = require('../middleware/auth')
const router = express.Router();
router.use(authMiddleware)
const departamentoService = require('../service/departamento_service.js')


router.get('/api/departamento', async function (req, res) {
    const departamento = await departamentoService.getDepartamento();
    res.json(departamento)

})
router.get('/api/departamento/:id', async function (req, res) {
    try {
        const departamento = await departamentoService.getOneDepartamento(req.params.id)
        res.status(200).json(departamento)
    } catch (e) {
        res.status(404).send(e.message)
    }

})

router.post('/api/departamento', async function (req, res) {
    const departamento = req.body;
    if (await departamentoService.existeDepartamento(departamento)) {
        res.status(404).send("Departamento já existe!")
    } else {
        const newDepartamento = await departamentoService.saveDepartamento(departamento)
        res.status(201).json(newDepartamento)
    }


})

router.put('/api/departamento/:id', async function (req, res) {
    const departamento = req.body;
    if (await departamentoService.existeDepartamento(departamento)) {
        res.status(404).send("Departamento já existe!")
    } else {
        const respdepartamento = await departamentoService.putDepartamento(req.params.id, departamento)
        res.status(204).json(respdepartamento).end()
    }

})
router.delete('/api/departamento/:id', async function (req, res) {
    const respDepartamentoDelete = await departamentoService.deletDepartamento(req.params.id)
    res.status(204).json(respDepartamentoDelete).end()
})

module.exports = router

