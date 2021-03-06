// camada responsavel por rotear recebendo as requisições

const express = require('express');
const fs = require('fs');
const authMiddleware = require('../middleware/auth')
const uploadFiles = require('../middleware/uploadFiles')
const router = express.Router();
router.use(authMiddleware)
const baseconhecimentoService = require('../service/baseconhecimento_service.js')
const linksService = require('../service/links_service.js')

router.get('/api/baseconhecimento', async function (req, res) {
    const baseconhecimento = await baseconhecimentoService.getBaseConhecimento();
    res.json(baseconhecimento)

})

router.get('/api/baseconhecimento/:id', async function (req, res) {
    try {
        const baseconhecimento = await baseconhecimentoService.getOneBaseConhecimento(req.params.id)
        res.status(200).json(baseconhecimento)
    } catch (e) {
        res.status(404).send(e.message)
    }

})
router.post('/api/baseconhecimento/upload-file', uploadFiles.single('file'), async function (req, res) {
    const file = req.file
    if (file) {
        const newBaseConhecimento = await baseconhecimentoService.saveBaseConhecimento(file)
        if (newBaseConhecimento) {
            return res.status(201).json({
                erro: false,
                mensagem: "Upload realizado com sucesso!"
            });
        } else {
            fs.unlink(file.path, (err) => {
                if (err) throw err;
                console.log('path/file.txt foi deletado');
            });
        }
    }

    return res.status(400).json({
        erro: true,
        mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
    });


})
router.post('/api/baseconhecimento', async function (req, res) {
    const baseconhecimento = req.body;
    if (await baseconhecimentoService.existeBaseConhecimento(baseconhecimento)) {
        res.status(404).send("Arquivo já existe!")
    } else {
        const newBaseConhecimento = await baseconhecimentoService.saveBaseConhecimento(baseconhecimento)
        res.status(201).json(newBaseConhecimento)
    }
})
router.post('/api/baseconhecimento/links', async function (req, res) {
    const links = req.body;
    const newLinks = await linksService.saveLinks(links)
    res.status(201).json(newLinks)

})
router.put('/api/baseconhecimento/:id', async function (req, res) {
    const baseconhecimento = req.body;
    if (await baseconhecimentoService.existeBaseConhecimento(baseconhecimento)) {
        res.status(404).send("Arquivo já existe!")
    } else {
        const respbaseconhecimento = await baseconhecimentoService.putBaseConhecimento(req.params.id, baseconhecimento)
        res.status(204).json(respbaseconhecimento).end()
    }

})
router.delete('/api/baseconhecimento/:id', async function (req, res) {
    const bc = await baseconhecimentoService.getOneBaseConhecimento(req.params.id)
    const respBaseConhecimentoDelete = await baseconhecimentoService.deletBaseConhecimento(req.params.id)
    const f = __dirname.slice(0, __dirname.length - 6)
    fs.stat(f + '\\upload\\' + bc[0].url, (err) => {
        if (err)
            throw err;
        fs.unlink('src\\upload\\' + bc[0].url, (err) => {
            if (err)
                throw err;
        })
    })
    if (respBaseConhecimentoDelete.status === 1)
        res.status(204).json(respBaseConhecimentoDelete).end()
    else {
        res.status(400).json(respBaseConhecimentoDelete.mensage)
    }
})
router.delete('/api/baseconhecimentopro/:id', async function (req, res) {
    const respBaseConhecimentoDelete = await baseconhecimentoService.deletBaseConhecimento(req.params.id)
    if (respBaseConhecimentoDelete.status === 1) {
        res.status(204).json(respBaseConhecimentoDelete).end()
    } else {
        res.status(400).json(respBaseConhecimentoDelete.mensage)
    }
})

module.exports = router

