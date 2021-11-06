const express = require('express');
const path = require('path');
const cors = require('cors');
const { getUsuario } = require('./data/usuario_data');
require('dotenv').config()
const app = express();

//app.use(cors());
app.use((req, res, next) => {
    console.log(req.headers)
    //res.header("Access-Control-Allow-Origin","http://kmcollaborator.herokuapp.com");
    res.header("Access-Control-Allow-Origin","http://kmcollaborator.herokuapp.com");
    //res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Credentials",'true');
    //res.header("Access-Control-Allow-Headers", "Content-Type,authorization, X-Requested-With")

    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json());
async function isu(){
    const user =await getUsuario()
    user.lea

}
app.use('/v1/midias',express.static(path.resolve(__dirname,"upload")));

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
