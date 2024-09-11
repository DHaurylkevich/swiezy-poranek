const jwtUtility = require("../utility/jwt");

// Аутентификация JWT
module.exports = authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwtUtility.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = decoded;
    next();
};