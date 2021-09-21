"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = __importDefault(require("../models/admin.model"));
class AdminService {
    static async getAdmin(email) {
        return admin_model_1.default.findOne({ email: email });
    }
    static async createAdmin(body) {
        const admin = new admin_model_1.default({
            email: body.email,
            password: body.password,
            name: body.name,
            isAdmin: true,
        });
        return admin.save();
    }
    static async getAllAdmins() {
        return admin_model_1.default.find();
    }
    static async getAdminByEmail(email) {
        return admin_model_1.default.findOne({ email });
    }
}
exports.default = AdminService;
