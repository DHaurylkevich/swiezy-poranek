const jwtUtility = require("../utility/jwt");

// Мидлвар для аутентификации JWT
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    const decoded = jwtUtility.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = decoded;
    next();
};

// Проверка аутентификации
const checkAuth = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ isAuthenticated: false, message: 'Not authenticated' });
    }

    try {
        const decoded = jwtUtility.verifyToken(token);
        res.status(200).json({ isAuthenticated: true, user: decoded });
    } catch (err) {
        return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
    }
};

//Обновление токена
const refreshTokenAdmin = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ isAuthenticated: false, message: "Token is required" });
    }
    
    const decoded = jwtUtility.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ isAuthenticated: false,message: 'Token is not valid' });
    }

    const newToken = jwtUtility.generateToken(decoded.id, decoded.email);

    res.cookie('token', newToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 60 * 60 * 1000
    });

    res.send('Token refreshed');
}

module.exports = { authenticateJWT, checkAuth, refreshTokenAdmin };

