const express = require('express');
const authMiddleware = require('./middleware/auth')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware)
/*app.use((req, res, next)=>{
    //console.log('middleware')
    res.header("Access-Control-Allow-Origin","*");
    app.use(cors());
    next();
})*/
app.use('/',require('./route/questionsRoute'))
app.use('/',require('./route/avaliacaoRoute'))
app.use('/',require('./route/usuariosRoute'))
app.use('/',require('./route/departamentoRoute'))
app.listen(3001)
