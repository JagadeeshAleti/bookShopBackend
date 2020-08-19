const jwt = require('jsonwebtoken')
function authinticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if (authHeader == null) {
        return res.status(401).send({message: 'toekn requrired'})
    }
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) return res.status(403).send({message: "Invalid token"})
        next()
    })
}

module.exports.authinticateToken = authinticateToken  