const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());

app.use('/midias',express.static(path.resolve(__dirname,"upload")));

app.use('/v1/',require('./route/authRoute'))
app.use('/v1/',require('./route/baseconhecimentoRoute.js'))
app.use('/v1/',require('./route/usuariosRoute'))
app.use('/v1/',require('./route/grupoRoute'))
app.use('/v1/',require('./route/correcaoRoute'))
app.use('/v1/',require('./route/profissionalroute'))
app.use('/v1/',require('./route/questionsRoute'))
app.use('/v1/',require('./route/avaliacaoRoute'))
app.use('/v1/',require('./route/departamentoRoute'))
app.listen(process.env.PORT || 3001)
