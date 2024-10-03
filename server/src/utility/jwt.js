const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const generateToken = (id, email) => {
    const payload = { id: id, email: email };
    return jwt.sign(
        payload, 
        secretKey, 
        { expiresIn: '1h' },
        );
}

const verifyToken = (token) => {    
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null
    }
}
module.exports = { generateToken, verifyToken };