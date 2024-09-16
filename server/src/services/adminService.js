const Admin = require('../models/admin');

const bcrypt = require("bcrypt");
const jwt = require("../utility/jwt");


const loginAdmin = async (email, password) => {
    const adminExist = await findAdminByEmail(email);
    if (!adminExist) throw new Error("Invalid credentials");

    const isMatch = await comparePassword(password, adminExist.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return jwt.generateToken(adminExist);
}

const changePassword = async (oldPassword, newPassword, email) => {

    const adminExist = await findAdminByEmail(email);
    if (!adminExist) throw new Error("Invalid credentials");

    const isMatch = await comparePassword(oldPassword, adminExist.password);
    if (!isMatch) throw new Error("Invalid credentials");

    if( oldPassword === newPassword ) throw new Error("New password cannot be the same as the old password");

    adminExist.password = newPassword;
    return await adminExist.save();
}

const findAdminByEmail = async (email) => {
    try {
        return await Admin.findOne({ email });
    } catch (err) {
        throw new Error("Database error occurred");
    }
};

const comparePassword = async (verifiablePassword, hashPassword) => {
    try {
        return await bcrypt.compare(verifiablePassword, hashPassword);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    loginAdmin,
    changePassword,
    findAdminByEmail,
    comparePassword
}
