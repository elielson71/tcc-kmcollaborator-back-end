const jwt = require('jsonwebtoken')
const authConfig = require('../infra/config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //console.log(req.originalUrl==='/v1/midias/')
    if(req.url.slice(0,7)==='/midias')
        return next()
    
    
    if (!authHeader)
        return res.status(401).send({ error: 'No toke provided' })

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' })

    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err) return res.status(401).send({error: 'Token invalid'})

        req.userId = decoded.id;
        return next()
    })
}