const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());

app.use('/midias',express.static(path.resolve(__dirname,"upload")));

app.use('/v1/',require('./route/authroute'))
app.use('/v1/',require('./route/baseconhecimento_route'))
app.use('/v1/',require('./route/usuariosroute'))
app.use('/v1/',require('./route/gruporoute'))
app.use('/v1/',require('./route/correcaoroute'))
app.use('/v1/',require('./route/profissionalroute'))
app.use('/v1/',require('./route/questionsroute'))
app.use('/v1/',require('./route/avaliacaoroute'))
app.use('/v1/',require('./route/departamentoroute'))
app.listen(process.env.PORT || 3001)
