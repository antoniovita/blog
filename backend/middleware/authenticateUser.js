const jwt = require('jsonwebtoken');

const authentincateUser = (req, res, next) => {
    const token = req.headers['Authorization'];

    if(!token) {
        return res.status(401).json({ error: 'Usuário não está logado. Token de autenticação ausente.'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403)
        }
    })
}