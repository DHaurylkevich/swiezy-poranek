const jwtUtility = require("../utility/jwt");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1]; // Извлекаем токен из заголовка

    const decoded = jwtUtility.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = decoded; // Добавляем данные пользователя в запрос
    next();
};

// checkAuth: Проверка аутентификации
exports.checkAuth = (req, res) => {
    try {
        const decoded = req.user; // Информация о пользователе уже декодирована в middleware
        res.status(200).json({ isAuthenticated: true, user: decoded });
    } catch (err) {
        return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
    }
};

// refreshToken: Обновление токена (если нужно)
exports.refreshTokenAdmin = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Authorization token is required" });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwtUtility.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Token is not valid' });
    }

    const newToken = jwtUtility.generateToken(decoded.id, decoded.email);

    // Отправляем новый токен
    res.status(200).json({ token: newToken });
}