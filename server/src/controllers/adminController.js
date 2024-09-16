const AdminService = require("../services/adminService").default;

//Вход  в систему
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await AdminService.loginAdmin(email, password)
        res.json({ token });
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//Выход из системы


//Смена пароля
exports.changePassword = async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
        const email = req.user.email

        const password = await AdminService.changePassword(oldPassword, newPassword, email)
        if (!password) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Password changed"});
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
}
