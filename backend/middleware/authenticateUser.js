const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Usuário não está logado, token ausente.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        };

        req.user = decoded; 
        next();
    });
};

module.exports = authenticateUser;