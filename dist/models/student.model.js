"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const StudentSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    imageUrl: {
        type: String,
        default: config_1.default.defaultImageUrl,
    },
    courses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "course" }],
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
    return await bcrypt_1.default.compare(password, user.password).catch(() => false);
};
const Student = mongoose_1.default.model("student", StudentSchema);
exports.default = Student;
