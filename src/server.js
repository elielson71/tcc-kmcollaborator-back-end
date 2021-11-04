const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config()
const app = express();
//app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "127.0.0.1");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json());

app.use('/midias',express.static(path.resolve(__dirname,"upload")));

app.use('/v1/',require('./route/auth_route'))
app.use('/v1/',require('./route/baseconhecimento_route'))
app.use('/v1/',require('./route/usuarios_route'))
app.use('/v1/',require('./route/grupo_route'))
app.use('/v1/',require('./route/correcao_route'))
app.use('/v1/',require('./route/profissional_route'))
app.use('/v1/',require('./route/questions_route'))
app.use('/v1/',require('./route/avaliacao_route'))
app.use('/v1/',require('./route/departamento_route'))
app.listen(process.env.PORT || 3001)
