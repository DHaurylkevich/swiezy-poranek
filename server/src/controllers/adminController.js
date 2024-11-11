const AdminService = require("../services/adminService");

require("dotenv").config();

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await AdminService.loginAdmin(email, password);

        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.logoutAdmin = (req, res) => {
    res.clearCookie('token');
    res.send('Logged out successfully');
};

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, email } = req.body;

        const password = await AdminService.changePassword(oldPassword, newPassword, email)
        if (!password) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Password changed" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
