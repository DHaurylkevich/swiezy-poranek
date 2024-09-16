const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },

});

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// const Admin =mongoose.model("Admin", AdminSchema)
// const createAdmin = async (email, password) => {
//     const admin = new Admin({ email, password });
//     await admin.save();
//     console.log('Admin created:', admin);
// };
// createAdmin('admin@gmail.com', 'admin');

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;