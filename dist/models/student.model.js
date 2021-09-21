"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const StudentSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(this.password, config_1.default.saltRounds);
        this.password = hashedPassword;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
StudentSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcrypt_1.default.compare(password, user.password).catch((e) => false);
};
const Student = mongoose_1.default.model("student", StudentSchema);
exports.default = Student;
