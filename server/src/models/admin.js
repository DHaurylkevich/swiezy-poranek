const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
})

adminSchema.pre("save", async function (next) {
    try{
        if(!this.isModified("password")){
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch (err){
        next(err);
    }
})

adminSchema.methods.comparePassword = async function (checkPassword){
    return await bcrypt.compare(checkPassword, this.password);
}

module.exports = mongoose.model("Admin", adminSchema);