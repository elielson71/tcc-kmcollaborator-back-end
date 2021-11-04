// camada responsavel por rotear recebendo as requisições

const express = require('express');
const authMiddleware = require('../middleware/auth')
const router = express.Router();
router.use(authMiddleware)
const grupoService = require('../service/grupo_service')

router.get('/api/grupo', async function (req, res) {
    const grupo = await grupoService.getGrupo();
    res.json(grupo)

})
router.get('/api/grupo/:id', async function (req, res) {
        const grupo = await grupoService.getOneGrupo(req.params.id)
        res.status(200).json(grupo)
})
router.get('/api/usuariogrupo/:id', async function (req, res) {
        const grupo = await grupoService.getUsuarioGrupo(req.params.id)
        res.status(200).json(grupo)
})

router.post('/api/grupo', async function (req, res) {
    const grupo = req.body;
    if (await grupoService.existeNome(grupo)) {
        res.status(404).send("Nome já existe!")
    } else {
        const newGrupo = await grupoService.saveGrupo(grupo)
        res.status(201).json(newGrupo)
    }
})

router.put('/api/grupo/:id', async function (req, res) {
    const grupo = req.body;
    if (await grupoService.existeNome(grupo)) {
        res.status(404).send("Nome existe!")
    } else {
        const respgrupo = await grupoService.putGrupo(req.params.id, grupo)
        res.status(204).json(respgrupo).end()
    }

})
router.delete('/api/grupo/:id', async function (req, res) {
    const respGrupoDelete = await grupoService.deletGrupo(req.params.id)
    if(respGrupoDelete.status===1)
    res.status(204).json(respGrupoDelete).end()
    else{
        res.status(400).json(respGrupoDelete.mensage)
    }
})

module.exports = router

