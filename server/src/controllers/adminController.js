const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

//Вход  в систему
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Неверные данные"})
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Неверные данные"})
        }

        const token = jwt.sign({ user: { id: admin._id, role: admin.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(200).json({ message: "Логин успешен"})
    }catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

//Выход из системы
//Смена пароля
